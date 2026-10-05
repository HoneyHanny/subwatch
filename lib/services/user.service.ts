import { CreateUserDto, UserModel, UpdateUserDto } from "@/lib/types/user.type"
import userRepository, {
  IUserRepository,
} from "@/lib/repositories/user.repository"
import { Result } from "@/lib/types/result.type"

export interface IUserService {
  createUser(user: CreateUserDto): Promise<Result<UserModel>>

  getUser(id: string): Promise<Result<UserModel>>

  getUsers(): Promise<Result<UserModel[]>>

  updateUser(id: string, user: CreateUserDto): Promise<Result<UserModel>>

  deleteUser(id: string): Promise<Result<void>>
}

class UserService implements IUserService {
  constructor(private readonly _repository: IUserRepository) {
    this.createUser = this.createUser.bind(this)
    this.getUser = this.getUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  async createUser(user: CreateUserDto): Promise<Result<UserModel>> {
    return await this._repository.createUser(user)
  }

  async getUser(id: string): Promise<Result<UserModel>> {
    return await this._repository.getUser(id)
  }

  async getUsers(): Promise<Result<UserModel[]>> {
    return await this._repository.getUsers()
  }

  async updateUser(
    id: string,
    user: UpdateUserDto
  ): Promise<Result<UserModel>> {
    return await this._repository.updateUser(id, user)
  }

  async deleteUser(id: string): Promise<Result<void>> {
    return await this._repository.deleteUser(id)
  }
}

export default new UserService(userRepository)
