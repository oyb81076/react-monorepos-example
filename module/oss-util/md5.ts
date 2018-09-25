import crypto = require("crypto")
import fs = require('fs')
export const file_md5_base64 = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash("md5")
    const stream = fs.createReadStream(filename)
    stream.on("error", reject)
    stream.on("data", d => h.update(d))
    stream.on("end", () => {
      resolve(h.digest("base64"))
    })
  })
}
