import { options, consumerRole } from '@module/etc/oss'
import OSS, { OssError } from "ali-oss"
const sts = new OSS.STS(options)
sts.assumeRole(consumerRole, {
  Statement: [
    {
      Effect: "Allow",
      Resource: ["*"],
      Action: ["*"]
    }
  ],
  Version: "1",
}, 3600, "app").then(async ({ credentials: { AccessKeyId, AccessKeySecret, SecurityToken } }) => {
  const client = new OSS({
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken
  })
  await client.put("readme.txt", Buffer.from("this is next " + new Date))
  await client.get("readme.txt", process.stdout)
}).catch((err: OssError) => {
  console.error(err)
})
