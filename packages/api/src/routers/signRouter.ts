import * as Router from "koa-router"
import { valid, joi } from "../tools/valid"
import { sign } from "../auth"
import { ObjectId } from "bson"
import { UserRole } from "@app/models"
import "koa-body"

const router = new Router()
export = router

/**
 * 用户登录jwt
 */
router.post(
  "/in",
  valid({
    body: {
      username: joi.string().required(),
      password: joi.string().required(),
    },
  }),
  async (ctx) => {
    const { username, password } = ctx.request.body
    if (username === "root" && password === "root") {
      const session = {
        id: new ObjectId().toHexString(),
        role: UserRole.ROOT,
      }
      ctx.body = { token: sign(session) }
    } else {
      ctx.throw()
    }
  },
)
