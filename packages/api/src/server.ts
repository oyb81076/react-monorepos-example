import app from "./app"
import http from "http"
import { getFileLogger } from "./logger"
const server = http.createServer(app.callback())
const port = parseInt(process.env.PORT || "8080", 10)
const host = process.env.HOST || "0.0.0.0"
const logger = getFileLogger(__filename)
server.listen(port, host)
server.on("listening", () => {
  logger.info("Listening on %o", server.address())
})
server.on("error", (error: any) => {
  if (error.syscall === "listen") {
    if (error.code === "EACCES") {
      logger.error("%o requires elevated privileges", server.address())
      process.exit(1)
    } else if (error.code === "EADDRINUSE") {
      logger.error("%o is already in use", server.address())
      process.exit(1)
    }
  }
  throw error
})
