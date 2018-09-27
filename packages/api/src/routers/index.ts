import KoaRouter from "koa-router"
import stsRouter from "./stsRouter"
const router = new KoaRouter()
export = router
router.use("/api/sts", stsRouter.routes(), stsRouter.allowedMethods())
