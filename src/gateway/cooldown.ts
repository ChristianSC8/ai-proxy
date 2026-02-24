const cooldownMap = new Map<string, number>()

export function setCooldown(modelId: string, ttlMs: number): void {
  cooldownMap.set(modelId, Date.now() + ttlMs)
}

export function isOnCooldown(modelId: string): boolean {
  const expiresAt = cooldownMap.get(modelId)
  if (expiresAt === undefined) {
    return false
  }
  if (Date.now() >= expiresAt) {
    cooldownMap.delete(modelId)
    return false
  }
  return true
}

export function getCooldowns(): Record<string, number> {
  const now = Date.now()
  const result: Record<string, number> = {}

  for (const [modelId, expiresAt] of cooldownMap) {
    if (now < expiresAt) {
      result[modelId] = expiresAt
    } else {
      cooldownMap.delete(modelId)
    }
  }

  return result
}
