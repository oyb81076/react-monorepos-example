import * as log4js from "log4js"
const level = process.env.NODE_ENV === "development" ? "DEBUG" : "DEBUG"

// 注意关于 wss
log4js.configure({
  appenders: {
    std: { type: "console" },
  },
  categories: {
    default: { appenders: ["std"], level },
  },
})

// tslint:disable-next-line:variable-name
export const getFileLogger = (__filename: string) => {
  return log4js.getLogger(__filename.substring(__dirname.length + 1, __filename.length - 3))
}
