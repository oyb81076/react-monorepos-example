import { Middleware } from "koa"
import { AnySchema } from "joi"
import _joi from "joi"
// tslint:disable-next-line:no-var-requires
const validation = require("koa2-validation")
export const valid: (schema: {
  params?: Record<string, AnySchema>,
  query?: Record<string, AnySchema>,
  body?: Record<string, AnySchema>,
}) => Middleware = validation
export const joi = _joi
