import { Hono } from "hono"
import { env } from "./src/config/env.ts"
import { printBanner } from "./src/banner.ts"
import { auth } from "./src/middleware/auth.ts"
import { proxy } from "./src/routes/proxy.ts"
import { status } from "./src/routes/status.ts"

const app = new Hono()

app.use("/v1/*", auth)
app.route("/", proxy)
app.route("/", status)

Bun.serve({
  port: env.PORT,
  fetch: app.fetch,
  development: env.NODE_ENV !== "production",
})

printBanner()
