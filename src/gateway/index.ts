import { fallback, fallbackStream } from "./fallback.ts"
import type { ChatRequest, ChatResult, ChatCompletion, ChatCompletionChunk, StreamResult } from "../types/gateway.ts"

function generateChatId(): string {
  return `chatcmpl-${crypto.randomUUID().replace(/-/g, "")}`
}

export async function dispatch(request: ChatRequest): Promise<ChatResult> {
  return fallback(request)
}

export async function dispatchStream(request: ChatRequest): Promise<StreamResult> {
  return fallbackStream(request)
}

export function toCompletion(result: ChatResult): ChatCompletion {
  return {
    id: generateChatId(),
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: result.modelId,
    choices: [{
      index: 0,
      message: { role: "assistant", content: result.content },
      finish_reason: "stop",
    }],
  } satisfies ChatCompletion
}

export function toChunk(chunk: ChatCompletionChunk, id: string, modelId: string): ChatCompletionChunk {
  return {
    ...chunk,
    id,
    model: modelId,
  }
}

export { generateChatId }
