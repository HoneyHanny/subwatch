import { UserModel } from "../types/user.type";

export function fromDatabaseToUser(data: any): UserModel | null {
  if (data === undefined) {
    return null
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email
  }
}

export function fromDatabaseToUserList(data: any): UserModel[] | null {
  if (data === undefined) {
    return null
  }

  return data.map((d: any) => fromDatabaseToUser(d))
}