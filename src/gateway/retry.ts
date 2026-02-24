import { AppError } from "../types/errors.ts"
import { setCooldown } from "./cooldown.ts"
import { log } from "../logger.ts"
import type { AIModel } from "../types/model.ts"
import type { ChatRequest } from "../types/gateway.ts"

const MAX_ATTEMPTS = 3
const BASE_DELAY = 500
const MAX_DELAY = 10_000
const COOLDOWN_TTL = 60_000

export async function retryModel<T extends { attempts: number }>(
  model: AIModel,
  request: ChatRequest,
  call: (model: AIModel, request: ChatRequest) => Promise<T>,
): Promise<T> {

  let lastError: AppError | undefined

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const result = await call(model, request)
      return {
        ...result,
        attempts: attempt + 1,
      }
    } catch (error) {

      if (!(error instanceof AppError)) {
        throw error
      }
      if (error.behavior.cooldown) {
        setCooldown(model.id, COOLDOWN_TTL)
        log.warn({ model: model.id, ttl: COOLDOWN_TTL }, "cooldown activated")
      }
      if (!error.behavior.retryable) {
        throw error
      }
      lastError = error
      if (attempt < MAX_ATTEMPTS - 1) {
        const delay = backoff(attempt)
        log.warn({ model: model.id, attempt: attempt + 1, delay: Math.round(delay) }, "retrying")
        await sleep(delay)
      }
    }
  }
  log.error({ model: model.id, attempts: MAX_ATTEMPTS }, "retry attempts exhausted")
  throw lastError!
}

function backoff(attempt: number): number {
  const delay = BASE_DELAY * Math.pow(2, attempt) + Math.random() * 1000
  return Math.min(delay, MAX_DELAY)
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
