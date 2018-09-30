import Router from "koa-router"
import stsRouter from "./stsRouter"
import signRouter from "./signRouter"
const router = new Router()
export = router
router.use("/api/sts", stsRouter.routes(), stsRouter.allowedMethods())
router.use("/api/sign", signRouter.routes(), signRouter.allowedMethods())
