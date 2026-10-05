"use client"

import { DataTable } from "@/components/DataTable"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/lib/store/auth/auth.store"
import type { SubscriptionModel } from "@/lib/types/subscription.type"

export default function Page() {
  const userId = useAuthStore((state) => state.user?.id)
  const [subscriptionResult, setSubscriptionResult] = useState<{
    userId: string
    data: SubscriptionModel[]
  } | null>(null)
  const subscriptions =
    subscriptionResult && subscriptionResult.userId === userId
      ? subscriptionResult.data
      : []

  useEffect(() => {
    if (!userId) return

    const controller = new AbortController()
    const getSubscriptions = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/subscriptions`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to load subscriptions")
        }

        const result = await response.json()
        setSubscriptionResult({ userId, data: result.data ?? [] })
      } catch (error) {
        if (!controller.signal.aborted) console.error(error)
      }
    }

    void getSubscriptions()

    return () => controller.abort()
  }, [userId])

  return (
    <Card className="h-full w-full p-8">
      <div className="flex justify-end"></div>
      <DataTable columns={[]} data={subscriptions} />
    </Card>
  )
}
