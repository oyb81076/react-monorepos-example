import "@app/admin"
import register from "./registerServiceWorker"
if (process.env.NODE_ENV === "development") {
  register()
}
