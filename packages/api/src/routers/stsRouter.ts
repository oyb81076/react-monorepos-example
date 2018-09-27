/**
 * 对已经登录的用户发放sts临时凭证
 * 凭证的有效使用地址为 <bucket>/<dir>/<accountId>/
 */
import KoaRouter from "koa-router"
import * as auth from "../auth"
import { STS, ClientOpts } from "ali-oss"
import path from "path"
import { bucket, dir, endpoint } from "@module/etc/oss"
import { accessKeyId, accessKeySecret, arn } from "@module/etc/oss-sts"
const router = new KoaRouter()
export = router
const cli = new STS({ accessKeyId, accessKeySecret })
router.get("/", auth.anyone, async (ctx) => {
  const namespace = ctx.session.id
  const expiresIn = 3600
  const { credentials: { AccessKeyId, AccessKeySecret, SecurityToken } } = await cli.assumeRole(arn, {
    Statement: [
      {
        Effect: "Allow",
        Resource: path.join(`acs:oss:*:*:${bucket}`, dir, namespace, "*"),
        Action: "oss:PutObject",
      },
    ],
    Version: "1",
  }, expiresIn, "client")
  const opts: ClientOpts = {
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
    endpoint,
    bucket,
  }
  ctx.body = { opts, expiresIn, dir, namespace }
})
