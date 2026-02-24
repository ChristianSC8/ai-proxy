import { Hono } from "hono"
import { ROUTES } from "../config/routes.ts"
import {
  getHealthStatus,
  getModelStatuses,
  getPoolStatuses,
  getCooldownStatuses
} from "../gateway/status.ts"

export const status = new Hono()

status.get(ROUTES.STATUS, (c) => {
  return c.json(getHealthStatus())
})

status.get(ROUTES.STATUS_POOLS, (c) => {
  return c.json({ pools: getPoolStatuses() })
})

status.get(ROUTES.STATUS_COOLDOWNS, (c) => {
  return c.json({ cooldowns: getCooldownStatuses() })
})

status.get(ROUTES.STATUS_MODELS, (c) => {
  return c.json({ models: getModelStatuses() })
})
