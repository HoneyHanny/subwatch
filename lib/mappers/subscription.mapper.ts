import { SubscriptionModel } from "@/lib/types/subscription.type"

export function fromDatabaseToSubscription(
  data: any
): SubscriptionModel | null {
  if (data === undefined) {
    return null
  }
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    cost: data.cost,
    currency: data.currency,
    billingCycle: data.billing_cycle,
    nextBillingDate: data.next_billing_date,
    category: data.category,
    status: data.status,
  }
}

export function fromDatabaseToSubscriptionList(
  data: any
): SubscriptionModel[] | null {
  if (data === undefined) {
    return null
  }
  return data.map((d: any) => fromDatabaseToSubscription(d))
}
