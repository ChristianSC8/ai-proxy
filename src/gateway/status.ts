import { MODELS } from "../config/models.ts"
import { POOL_ORDER } from "../types/pool.ts"
import { getCooldowns } from "./cooldown.ts"
import type { HealthStatus, ModelStatus, CooldownStatus } from "../types/gateway.ts"

export function getHealthStatus(): HealthStatus {
  const models = getModelStatuses()
  const available = models.filter(m => m.available).length

  return {
    status: "ok",
    models: models.length,
    available,
    cooledDown: models.length - available,
  }
}

export function getModelStatuses(): ModelStatus[] {
  const cooldowns = getCooldowns()

  return MODELS.map(m => ({
    id: m.id,
    model: m.modelName,
    pool: m.pool,
    provider: m.providerId,
    available: !cooldowns[m.id],
  }))
}

export function getPoolStatuses(): Record<string, ModelStatus[]> {
  const models = getModelStatuses()

  return Object.fromEntries(
    POOL_ORDER.map(pool => [
      pool,
      models.filter(m => m.pool === pool),
    ])
  )
}

export function getCooldownStatuses(): CooldownStatus[] {
  const cooldowns = getCooldowns()

  return Object.entries(cooldowns).map(([modelId, expiresAt]) => ({
    modelId,
    expiresAt: new Date(expiresAt).toISOString(),
    remainingMs: expiresAt - Date.now(),
  }))
}
