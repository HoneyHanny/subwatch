import type {
  SubscriptionModel,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from "@/lib/types/subscription.type"

import subscriptionRepository, {
  type ISubscriptionRepository,
} from "@/lib/repositories/subscription.repository"
import { SupabaseClient } from "@supabase/supabase-js"
import { isError } from "@/lib/utils/utils"
import { Result } from "@/lib/types/result.type"

export interface ISubscriptionService {
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

class SubscriptionService implements ISubscriptionService {

  constructor(private readonly _repository: ISubscriptionRepository) {
    this.createSubscription = this.createSubscription.bind(this)
    this.getSubscription = this.getSubscription.bind(this)
    this.getSubscriptions = this.getSubscriptions.bind(this)
    this.updateSubscription = this.updateSubscription.bind(this)
    this.deleteSubscription = this.deleteSubscription.bind(this)
  }

  async createSubscription(subscription: CreateSubscriptionDto) {
    const result = await this._repository.createSubscription(subscription)

    return result
  }

  async getSubscription(id: string) {
    const result = await this._repository.getSubscription(id)

    return result
  }

  async getSubscriptions() {
    const subsOrErr = await this._repository.getSubscriptions()
    return subsOrErr
  }

  async getSubscriptionsByUser(id: string) {
    // TODO: Move filtering and sort here

    const subsOrErr = await this._repository.getSubscriptionsByUser(id)
    return subsOrErr
  }

  async updateSubscription(id: string, subscription: UpdateSubscriptionDto) {
    const sub = await this._repository.getSubscription(id)

    if (!sub.ok) {
      return sub
    }

    const result = await this._repository.updateSubscription(
      id,
      subscription
    )

    return result
  }

  async deleteSubscription(id: string) {
    return await this._repository.deleteSubscription(id)
  }
}

export default new SubscriptionService(subscriptionRepository)
