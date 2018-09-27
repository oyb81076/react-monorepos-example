import Koa from "koa"
import koaBody from "koa-body"
import koaJson from "koa-json"
import koaLogger from "koa-logger"
import routers from "./routers"
// tslint:disable-next-line:no-var-requires
const koaOnerror = require("koa-onerror")
import { getFileLogger } from "./logger"
const logger = getFileLogger(__filename)
const app = new Koa()
koaOnerror(app)
app.proxy = true
app.use(koaLogger())
app.use(koaBody())
app.use(koaJson({
  param: "pretty",
  pretty: process.env.NODE_ENV === "development",
  spaces: 2,
}))
app.use(routers.routes())
app.use(routers.allowedMethods())
app.on("error", (err) => {
  if (!err.status) { logger.error(err) }
})
export = app
