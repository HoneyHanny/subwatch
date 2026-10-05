import { Result } from "@/lib/types/result.type"
import { CreateUserDto, UpdateUserDto, UserModel } from "@/lib/types/user.type"
import { createClient } from "@/lib/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"
import {
  BadGateway,
  BadRequest,
  NotImplemented,
  Unauthorized,
} from "../types/errors.type"
import { fromDatabaseToUser } from "../mappers/user.mapper"
import { Database } from "../types/database/database.type"

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<Result<UserModel>>

  getUser(id: string): Promise<Result<UserModel>>

  getUsers(): Promise<Result<UserModel[]>>

  updateUser(id: string, user: UpdateUserDto): Promise<Result<UserModel>>

  deleteUser(id: string): Promise<Result<void>>

  // Subject to removal
  isAdmin(id: string): Promise<Result<boolean>>

  // Subject to removal
  isAuthenticatedUser(id: string): Promise<Result<boolean>>
}

class UserRepository<
  T extends () => Promise<SupabaseClient<Database>>,
> implements IUserRepository {
  constructor(private readonly _database: T) {
    this.createUser = this.createUser.bind(this)
    this.getUser = this.getUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  async createUser(user: CreateUserDto): Promise<Result<UserModel>> {
    const database = await this._database()
    const { data, error } = await database.auth.signUp({
      email: user.email,
      password: user.password,
      options: { data: { name: user.name } },
    })

    if (error) {
      return {
        ok: false,
        error: new BadRequest(error.message),
      }
    }

    return {
      ok: true,
      value: { id: data!.user!.id, name: user.name, email: user.email },
    }
  }

  async getUser(id: string): Promise<Result<UserModel>> {
    const database = await this._database()
    const { data, error } = await database
      .from("profiles")
      .select("id, name, email")
      .eq("id", id)
      .single()

    if (error) {
      return {
        ok: false,
        error: new BadRequest(error.message),
      }
    }

    const user = fromDatabaseToUser(data)

    if (!user) {
      return {
        ok: false,
        error: new BadRequest("Failed to fetch user"),
      }
    }

    return { ok: true, value: user }
  }

  async getUsers(): Promise<Result<UserModel[]>> {
    return { ok: true, value: {} as UserModel[] }
  }

  async updateUser(
    id: string,
    user: UpdateUserDto
  ): Promise<Result<UserModel>> {
    const database = await this._database()

    const { error: authError } = await database.auth.updateUser({
      ...(user.password && { password: user.password }),
      ...(user.name && { data: { name: user.name } }),
    })

    if (authError) {
      return {
        ok: false,
        error: new BadRequest(authError?.message || "Failed to update user"),
      }
    }

    // TODO: Join the database calls

    const {
      data: { user: userData },
      error: userError,
    } = await database.auth.getUser()

    if (userError) {
      return {
        ok: false,
        error: new BadGateway(),
      }
    }

    if (!userData) {
      return {
        ok: false,
        error: new BadRequest("Failed to fetch updated user"),
      }
    }

    const { data: profileData, error: profileError } = await database
      .from("profiles")
      .update({ name: user.name })
      .select("id, name")
      .eq("id", id)
      .single()

    if (profileError) {
      return {
        ok: false,
        error: new BadGateway(profileError?.message || "Failed to update user"),
      }
    }

    if (!profileData) {
      return {
        ok: false,
        error: new BadRequest("Failed to fetch updated user"),
      }
    }

    return {
      ok: true,
      value: {
        id: profileData.id,
        name: profileData.name ?? "",
        email: userData!.email!,
      },
    }
  }

  // NOTE: Only admin or the user themselves should be able to delete the user
  async deleteUser(id: string): Promise<Result<void>> {
    const database = await this._database()

    const { data: claimsData, error: claimsError } =
      await database.auth.getClaims()

    if (claimsError || !claimsData?.claims) {
      return {
        ok: false,
        error: new BadRequest("Not authenticated"),
      }
    }

    const userId = claimsData.claims.sub

    // TODO: Make admin delete user
    // This logic should be in business layer

    if (userId !== id) {
      return {
        ok: false,
        error: new Unauthorized("Not authorized to delete this user"),
      }
    }

    const { error } = await database.auth.admin.deleteUser(userId)

    if (error) {
      return {
        ok: false,
        error: new BadGateway(error.message),
      }
    }

    return { ok: true, value: undefined }
  }

  async isAdmin(id: string): Promise<Result<boolean>> {
    // TODO: Implement this
    return {
      ok: false,
      error: new NotImplemented("isAdmin method not implemented"),
    }
  }

  async isAuthenticatedUser(id: string): Promise<Result<boolean>> {
    const database = await this._database()

    const { data: claimsData, error: claimsError } =
      await database.auth.getClaims()

    if (claimsError || !claimsData?.claims) {
      return {
        ok: false,
        error: new BadRequest("Not authenticated"),
      }
    }

    const userId = claimsData.claims.sub

    if (!userId) {
      return {
        ok: false,
        error: new BadRequest("Not authenticated"),
      }
    }

    if (userId !== id) {
      return {
        ok: true,
        value: false,
      }
    }

    return {
      ok: true,
      value: true,
    }
  }
}

export default new UserRepository<() => Promise<SupabaseClient>>(createClient)
