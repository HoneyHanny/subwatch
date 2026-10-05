export type BillingCycle = "weekly" | "monthly" | "yearly"
export type SubscriptionStatus = "active" | "paused" | "cancelled"

export interface SubscriptionModel {
  id: string
  userId: string
  name: string
  cost: number
  currency: string
  billingCycle: string
  nextBillingDate: Date
  category: string
  status: SubscriptionStatus
}

export interface CreateSubscriptionDto {
  userId: string
  name: string
  cost: number
  currency: string
  billingCycle: string
  nextBillingDate: Date
  category: string
  status: SubscriptionStatus
}

export interface UpdateSubscriptionDto {
  name?: string
  cost?: number
  currency?: string
  billingCycle?: string
  nextBillingDate?: Date
  category?: string
  status?: SubscriptionStatus
}
