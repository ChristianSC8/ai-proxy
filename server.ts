import { Hono } from "hono"
import { env } from "./src/config/env.ts"
import { log } from "./src/logger.ts"
import { auth } from "./src/middleware/auth.ts"
import { proxy } from "./src/routes/proxy.ts"
import { status } from "./src/routes/status.ts"

const app = new Hono()

app.use("/v1/*", auth)
app.route("/", proxy)
app.route("/", status)

log.info({ port: env.PORT }, "server started")

export default {
  port:  env.PORT,
  fetch: app.fetch,
}
