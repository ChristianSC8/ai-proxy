import { HttpError } from "../types/errors.ts"

const DEFAULT_TIMEOUT = 30_000
const STREAM_TIMEOUT = 120_000

interface HttpOptions {
  url: string
  headers: Record<string, string>
  body: object
  timeout?: number
}

export async function post<T>(options: HttpOptions): Promise<T> {

  const controller = new AbortController()
  const timeoutMs = options.timeout ?? DEFAULT_TIMEOUT
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(options.url, {
      method: "POST",
      signal: controller.signal,
      headers: options.headers,
      body: JSON.stringify(options.body),
    })

    if (!response.ok) {
      throw new HttpError(response.status, await response.text())
    }

    return await response.json() as T
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new HttpError(504, "Request timed out")
    }
    throw new HttpError(0, "Network error")
  } finally {
    clearTimeout(timer)
  }
}

export interface StreamResponse {
  response: Response
  clearTimeout: () => void
}

export async function postStream(options: HttpOptions): Promise<StreamResponse> {

  const controller = new AbortController()
  const timeoutMs = options.timeout ?? STREAM_TIMEOUT
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(options.url, {
      method: "POST",
      signal: controller.signal,
      headers: options.headers,
      body: JSON.stringify(options.body),
    })

    if (!response.ok) {
      clearTimeout(timer)
      throw new HttpError(response.status, await response.text())
    }

    return {
      response,
      clearTimeout: () => clearTimeout(timer),
    }
  } catch (error) {
    clearTimeout(timer)
    if (error instanceof HttpError) {
      throw error
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new HttpError(504, "Request timed out")
    }
    throw new HttpError(0, "Network error")
  }
}
