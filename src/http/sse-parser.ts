import type { ChatCompletionChunk } from "../types/gateway.ts"

export async function* parseSSE(
  body: ReadableStream<Uint8Array>,
): AsyncIterableIterator<ChatCompletionChunk> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })

      const lines = buffer.split("\n")
      buffer = lines.pop()!

      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed === "") continue
        if (trimmed === "data: [DONE]") return
        if (!trimmed.startsWith("data: ")) continue

        try {
          const json = trimmed.slice(6)
          yield JSON.parse(json) as ChatCompletionChunk
        } catch {
          continue
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

export function readableFromAsyncIterable<T>(
  iterable: AsyncIterable<T>,
): ReadableStream<T> {
  const iterator = iterable[Symbol.asyncIterator]()
  return new ReadableStream<T>({
    async pull(controller) {
      const { done, value } = await iterator.next()
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
    cancel() {
      iterator.return?.()
    },
  })
}
