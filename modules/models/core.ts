export enum UserRole {
  ROOT, ADMIN, MANAGER
}
export interface UserCore<ID, DATE> {
  _id: ID
  name: string
  age: number
  timestamp: DATE
}
