import { UserCore } from "./core";
import { Omit } from "lodash"

type ID = string
type DATE = string
export type User = UserCore<ID, DATE>
export type UserCreator = Omit<User, "_id" | "timestamp">
export type UserUpdater = Omit<User, "_id" | "timestamp">
