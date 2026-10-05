import { NextRequest, NextResponse } from "next/server"
import subscriptionService from "@/lib/services/subscription.service"
import { getErrorMessage, getStatusCode, isError } from "@/lib/utils/utils"
import superjson from "superjson"
import { CreateSubscriptionDto } from "@/lib/types/subscription.type"

export async function POST(request: NextRequest) {
  const text = await request.text()
  const body = superjson.parse<CreateSubscriptionDto>(text)
  console.log(text)
  console.log(body)

  const result = await subscriptionService.createSubscription({
    userId: body.userId,
    name: body.name,
    cost: body.cost,
    currency: body.currency,
    billingCycle: body.billingCycle,
    nextBillingDate: body.nextBillingDate,
    category: body.category,
    status: "active",
  })

  if (!result.ok) {
    const status = getStatusCode(result)
    const message = getErrorMessage(result)
    return NextResponse.json({ message: message }, { status: status })
  }

  return NextResponse.json(
    {
      data: result.value,
      message: "Subscription created successfully.",
    },
    { status: 201 }
  )
}

export async function GET(_: NextRequest) {
  const result = await subscriptionService.getSubscriptions()

  if (isError(result)) {
    const status = getStatusCode(result)
    const message = getErrorMessage(result)
    return NextResponse.json({ message }, { status })
  }

  return NextResponse.json(
    { data: result, message: "Subscription fetched." },
    { status: 200 }
  )
}
