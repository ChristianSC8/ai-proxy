const BASE = "/v1"

export const ROUTES = {
  CHAT_COMPLETIONS: `${BASE}/chat/completions`,
  STATUS:           `${BASE}/status`,
  STATUS_POOLS:     `${BASE}/status/pools`,
  STATUS_COOLDOWNS: `${BASE}/status/cooldowns`,
  STATUS_MODELS:    `${BASE}/status/models`,
} as const
