import { ObjectId } from "bson"
import { UserCore, UserRole } from "./core";

export type UserBson = UserCore<ObjectId, Date>
export interface SessionBson {
  _id?: ObjectId
  role: UserRole
}
