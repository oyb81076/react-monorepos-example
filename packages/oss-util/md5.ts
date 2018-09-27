import crypto from "crypto"
import fs from "fs"
export const fileMd5Base64 = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash("md5")
    const stream = fs.createReadStream(filename)
    stream.on("error", reject)
    stream.on("data", (d) => h.update(d))
    stream.on("end", () => {
      resolve(h.digest("base64"))
    })
  })
}
