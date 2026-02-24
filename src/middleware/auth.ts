import { createMiddleware } from "hono/factory"
import { env } from "../config/env.ts"
import { log } from "../logger.ts"

export const auth = createMiddleware(async (c, next) => {
  const header = c.req.header("Authorization")

  if (!header) {
    log.warn("missing authorization header")
    return c.json({ error: { message: "Missing Authorization header", type: "auth_error" } }, 401)
  }

  const token = header.replace("Bearer ", "")

  if (token !== env.PROXY_API_KEY) {
    log.warn("invalid api key")
    return c.json({ error: { message: "Invalid API key", type: "auth_error" } }, 401)
  }

  await next()
})
