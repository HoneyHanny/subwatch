import type {
  SubscriptionModel as SubscriptionModel,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from "@/lib/types/subscription.type"

import { createClient } from "@/lib/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"
import {
  BadRequest,
  InternalServerError,
  NotFound,
} from "@/lib/types/errors.type"
import {
  fromDatabaseToSubscription,
  fromDatabaseToSubscriptionList,
} from "@/lib/mappers/subscription.mapper"
import { DB_NOT_FOUND } from "@/constants/supabase.constants"
import { Result } from "@/lib/types/result.type"

export interface ISubscriptionRepository {
  createSubscription(
    subscription: CreateSubscriptionDto
  ): Promise<Result<SubscriptionModel>>

  getSubscription(id: string): Promise<Result<SubscriptionModel>>

  getSubscriptions(): Promise<Result<SubscriptionModel[]>>

  getSubscriptionsByUser(id: string): Promise<Result<SubscriptionModel[]>>

  updateSubscription(
    id: string,
    subscription: UpdateSubscriptionDto
  ): Promise<Result<SubscriptionModel>>

  deleteSubscription(id: string): Promise<Result<void>>
}

// TODO: decouple supabase client from repositories
class SubscriptionRepository<
  T extends () => Promise<SupabaseClient>,
> implements ISubscriptionRepository {
  constructor(private readonly _database: T) {
    this.createSubscription = this.createSubscription.bind(this)
    this.getSubscription = this.getSubscription.bind(this)
    this.getSubscriptions = this.getSubscriptions.bind(this)
    this.updateSubscription = this.updateSubscription.bind(this)
    this.deleteSubscription = this.deleteSubscription.bind(this)
  }

  async createSubscription(
    subscription: CreateSubscriptionDto
  ): Promise<Result<SubscriptionModel>> {
    const database = await this._database()
    const { data, error } = await database
      .from("subscriptions")
      .insert({
        user_id: subscription.userId,
        name: subscription.name,
        cost: subscription.cost,
        currency: subscription.currency,
        billing_cycle: subscription.billingCycle,
        next_billing_date: subscription.nextBillingDate,
        category: subscription.category,
        status: "active",
      })
      .select(
        "id, user_id, name, cost, currency, billing_cycle, next_billing_date, category, status"
      )
      .single()

    if (error) {
      console.log('repository error: ', error)
      return {
        ok: false,
        error: new BadRequest("Failed to create subscription"),
      }
    }

    return {
      ok: true,
      value: {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        cost: data.cost,
        currency: data.currency,
        billingCycle: data.billing_cycle,
        nextBillingDate: data.next_billing_date,
        category: data.category,
        status: data.status,
      },
    }
  }

  async getSubscription(id: string): Promise<Result<SubscriptionModel>> {
    const database = await this._database()
    const { data, error } = await database
      .from("subscriptions")
      .select()
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === DB_NOT_FOUND) {
        return { ok: false, error: new NotFound(error.message) }
      }
      return {
        ok: false,
        error: new BadRequest("Failed to fetch subscription"),
      }
    }

    const sub = fromDatabaseToSubscription(data)

    if (!sub) {
      return {
        ok: false,
        error: new BadRequest("Failed to fetch subscription"),
      }
    }

    return { ok: true, value: sub }
  }

  async getSubscriptions(): Promise<Result<SubscriptionModel[]>> {
    const database = await this._database()
    const { data, error } = await database.from("subscriptions").select()

    if (error) {
      return {
        ok: false,
        error: new BadRequest("Failed to fetch subscription"),
      }
    }

    const subs = fromDatabaseToSubscriptionList(data)

    if (!subs) {
      return {
        ok: false,
        error: new InternalServerError("Something went wrong"),
      }
    }

    return { ok: true, value: subs }
  }

  async getSubscriptionsByUser(
    id: string
  ): Promise<Result<SubscriptionModel[]>> {
    const database = await this._database()
    const { data, error } = await database
      .from("subscriptions")
      .select()
      .eq("user_id", id)

    if (error) {
      return {
        ok: false,
        error: new BadRequest("Failed to fetch subscriptions"),
      }
    }

    const subs = fromDatabaseToSubscriptionList(data)

    if (!subs) {
      return {
        ok: false,
        error: new InternalServerError("Internal server error"),
      }
    }

    return { ok: true, value: subs }
  }

  async updateSubscription(
    id: string,
    subscription: UpdateSubscriptionDto
  ): Promise<Result<SubscriptionModel>> {
    const database = await this._database()
    const { data, error } = await database
      .from("subscription")
      .update({
        name: subscription.name,
        cost: subscription.cost,
        currency: subscription.currency,
        billing_cycle: subscription.billingCycle,
        next_billing_date: subscription.nextBillingDate,
        category: subscription.category,
      })
      .eq("id", id)
      .single()

    if (error) {
      return {
        ok: false,
        error: new BadRequest("Failed to update subscription"),
      }
    }

    const sub = fromDatabaseToSubscription(data)

    if (!sub) {
      return {
        ok: false,
        error: new InternalServerError("Internal server error"),
      }
    }

    return { ok: true, value: sub }
  }

  async deleteSubscription(id: string): Promise<Result<void>> {
    const database = await this._database()
    const { error } = await database.from("subscription").delete().eq("id", id)

    if (error) {
      return {
        ok: false,
        error: new BadRequest("Failed to delete subscription"),
      }
    }
    return { ok: true, value: undefined }
  }
}

export default new SubscriptionRepository<() => Promise<SupabaseClient>>(
  createClient
)
