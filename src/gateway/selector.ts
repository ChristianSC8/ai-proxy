import { MODELS } from "../config/models.ts"
import { isOnCooldown } from "./cooldown.ts"
import type { Pool } from "../types/pool.ts"
import type { AIModel } from "../types/model.ts"

export function selectModel(pool: Pool): AIModel | null {
  const available = MODELS.filter(
    m => m.pool === pool && !isOnCooldown(m.id)
  )

  if (available.length === 0) {
    return null
  }

  return available[Math.floor(Math.random() * available.length)]!
}
