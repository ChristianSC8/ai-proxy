import { AppError, HttpError } from "../types/errors.ts"
import { post, postStream } from "../http/client.ts"
import { parseSSE, readableFromAsyncIterable } from "../http/sse-parser.ts"
import { log } from "../logger.ts"
import type { Provider, ProviderConfig } from "../types/provider.ts"
import type { ChatRequest, ChatResult, StreamResult, Message } from "../types/gateway.ts"
import type { AIModel } from "../types/model.ts"

interface OpenAIBody {
  model: string
  messages: Array<Message>
  max_tokens?: number
  temperature?: number
  stream: boolean
}

interface OpenAIResponse {
  choices: Array<{
    message: { content: string }
  }>
}

export class OpenAIProvider implements Provider {

  constructor(private readonly config: ProviderConfig) { }

  async complete(request: ChatRequest, model: AIModel): Promise<ChatResult> {
    log.info({ model: model.id, stream: false }, "sending request to provider")
    try {
      const data = await post<OpenAIResponse>({
        url: `${this.config.baseUrl}/chat/completions`,
        headers: this.buildHeaders(),
        body: this.buildBody(request, model, false),
      })

      const content = data.choices[0]?.message.content

      if (!content) {
        throw AppError.emptyResponse(model.id)
      }

      return {
        content,
        modelId: model.id,
        pool: model.pool,
        attempts: 1,
      } satisfies ChatResult

    } catch (error) {
      if (error instanceof HttpError) {
        log.error({ model: model.id, status: error.status }, "provider HTTP error")
        throw AppError.fromHttpStatus(error.status, model.id)
      }
      throw error
    }
  }

  async completeStream(request: ChatRequest, model: AIModel): Promise<StreamResult> {
    log.info({ model: model.id, stream: true }, "sending request to provider")
    try {
      const { response, clearTimeout: clearTimer } = await postStream({
        url: `${this.config.baseUrl}/chat/completions`,
        headers: this.buildHeaders(),
        body: this.buildBody(request, model, true),
      })

      if (!response.body) {
        clearTimer()
        throw AppError.emptyResponse(model.id)
      }

      const sseStream = parseSSE(response.body)
      const stream = readableFromAsyncIterable({
        async *[Symbol.asyncIterator]() {
          try {
            yield* sseStream
          } finally {
            clearTimer()
          }
        },
      })

      return {
        stream,
        modelId: model.id,
        pool: model.pool,
        attempts: 1,
      } satisfies StreamResult

    } catch (error) {
      if (error instanceof HttpError) {
        log.error({ model: model.id, status: error.status }, "provider HTTP error")
        throw AppError.fromHttpStatus(error.status, model.id)
      }
      throw error
    }
  }

  private buildHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.config.apiKey}`,
    }
  }

  private buildBody(
    request: ChatRequest,
    model: AIModel,
    stream: boolean
  ): OpenAIBody {
    return {
      model: model.modelName,
      messages: request.messages,
      max_tokens: request.maxTokens,
      temperature: request.temperature,
      stream,
    }
  }
}
