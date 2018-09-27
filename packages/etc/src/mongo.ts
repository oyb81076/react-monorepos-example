/**
 * mongo配置部分
 */
import { MongoClientOptions } from "mongodb"
export const options: MongoClientOptions = {
  poolSize: 20,
  useNewUrlParser: true,
}
export const url = "mongodb://127.0.0.1:27017"
export const dbName = "react_example"
