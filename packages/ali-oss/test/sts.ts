import OSS from "ali-oss"
import * as path from "path"
import { bucket, endpoint, dir } from "@app/etc/src/oss"
import { accessKeyId, accessKeySecret, arn } from "@app/etc/src/oss-sts"
/**
 * 临时令牌上传, 用于客户端, 服务器生成一个授权令牌给客户端, 客户端使用令牌上传
 */
test("sts", async () => {
  const sts = new OSS.STS({ accessKeyId, accessKeySecret })
  const props = await sts.assumeRole(arn, {
    Statement: [
      {
        Effect: "Allow",
        Resource: path.join(`acs:oss:*:*:${bucket}`, dir, "*"),
        Action: ["oss:Get*", "oss:Put*"],
      },
    ],
    Version: "1",
  }, 0, "tester")
  const { credentials: { AccessKeyId, AccessKeySecret, SecurityToken } } = props
  const client = new OSS({
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
    bucket,
    endpoint,
  })
  const randomText = "this is next " + new Date()
  const name = path.join(dir, "readme.txt")
  await client.put(name, Buffer.from(randomText), { headers: { "cache-control": "max-age=3600" } })
  const { content, res } = await client.get(name)
  expect(content.toString("utf-8")).toEqual(randomText)
  expect(res.headers["cache-control"]).toEqual("max-age=3600")
})
