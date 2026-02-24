import { POOL_ORDER } from "../types/pool.ts"
import { AppError } from "../types/errors.ts"
import { selectModel } from "./selector.ts"
import { retryModel } from "./retry.ts"
import { getProvider } from "../providers/factory.ts"
import { log } from "../logger.ts"
import type { ChatRequest } from "../types/gateway.ts"
import type { AIModel } from "../types/model.ts"

async function fallbackWith<T extends { attempts: number }>(
  request: ChatRequest,
  callFn: (model: AIModel, request: ChatRequest) => Promise<T>,
): Promise<T> {
  for (const pool of POOL_ORDER) {
    const model = selectModel(pool)
    if (!model) continue

    log.info({ pool, model: model.id }, "trying pool")

    try {
      return await retryModel(model, request, callFn)
    } catch (error) {
      if (!(error instanceof AppError)) throw error
      if (!error.behavior.fallback) throw error
      log.warn({ pool, model: model.id, error: error.message }, "falling back to next pool")
    }
  }

  log.error("all pools exhausted")
  throw AppError.exhausted()
}

export async function fallback(request: ChatRequest) {
  return fallbackWith(request, (m, r) => getProvider(m.providerId).complete(r, m))
}

export async function fallbackStream(request: ChatRequest) {
  return fallbackWith(request, (m, r) => getProvider(m.providerId).completeStream(r, m))
}
