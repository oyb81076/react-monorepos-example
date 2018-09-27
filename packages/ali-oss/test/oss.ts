import OSS from "ali-oss"
import { accessKeyId, accessKeySecret, bucket, endpoint } from "@module/etc/oss"
/**
 * OSS 直接调用, 一般用于服务端直接上传, 比如用户上传图片到服务器, 服务器压缩处理之后再上传到oss
 */
test("oss", async () => {
  const client = new OSS({
    accessKeyId,
    accessKeySecret,
    bucket,
    endpoint,
  })
  const text = "this is next " + new Date()
  await client.put("readme.txt", Buffer.from(text), { headers: { expires: Math.floor(Date.now() / 1000) } })
  const res = await client.get("readme.txt")
  expect(res.content.toString("utf-8")).toEqual(text)
})
