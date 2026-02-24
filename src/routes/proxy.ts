import { Hono } from "hono"
import { streamSSE } from "hono/streaming"
import type { Context } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import { ROUTES } from "../config/routes.ts"
import { chatCompletionSchema } from "../config/schemas.ts"
import { dispatch, dispatchStream, toCompletion, toChunk, generateChatId } from "../gateway/index.ts"
import { AppError } from "../types/errors.ts"
import { log } from "../logger.ts"
import type { ChatRequest } from "../types/gateway.ts"

export const proxy = new Hono()

proxy.post(ROUTES.CHAT_COMPLETIONS, async (c) => {

  const parsed = chatCompletionSchema.safeParse(await c.req.json())

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request"
    log.warn({ message }, "validation error")
    return c.json({ error: { message, type: "invalid_request_error" } }, 400)
  }

  const { messages, max_tokens, temperature, stream } = parsed.data
  const request: ChatRequest = { messages, maxTokens: max_tokens, temperature }

  log.info({ stream: !!stream }, "request received")

  if (stream) {
    return handleStream(c, request)
  }

  return handleNonStream(c, request)
})

async function handleNonStream(c: Context, request: ChatRequest) {
  try {
    const result = await dispatch(request)
    return c.json(toCompletion(result))
  } catch (error) {
    return toErrorResponse(c, error)
  }
}

async function handleStream(c: Context, request: ChatRequest) {
  try {
    const { stream, modelId } = await dispatchStream(request)
    const id = generateChatId()

    return streamSSE(c, async (sseStream) => {
      const reader = stream.getReader()

      c.req.raw.signal.addEventListener("abort", () => {
        reader.cancel()
      })

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = toChunk(value, id, modelId)
          await sseStream.writeSSE({ data: JSON.stringify(chunk) })
        }
        await sseStream.writeSSE({ data: "[DONE]" })
      } catch {
        await sseStream.writeSSE({
          data: JSON.stringify({
            error: { message: "Stream interrupted", type: "server_error" },
          }),
        })
      } finally {
        reader.releaseLock()
      }
    })

  } catch (error) {
    return toErrorResponse(c, error)
  }
}

function toErrorResponse(c: Context, error: unknown) {
  if (error instanceof AppError) {
    const { message, kind: type, behavior } = error
    log.error({ message, type, status: behavior.httpStatus }, "request failed")
    return c.json(
      { error: { message, type } },
      behavior.httpStatus as ContentfulStatusCode,
    )
  }
  log.error({ err: error }, "unexpected error")
  return c.json({ error: { message: "Internal server error", type: "internal_error" } }, 500)
}
