export interface UserModel {
  id: string
  name: string
  email: string
}

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  // email?: string
  password?: string
}
