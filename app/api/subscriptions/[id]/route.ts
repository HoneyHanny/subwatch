import { NextRequest, NextResponse } from "next/server"
import subscriptionService from "@/lib/services/subscription.service"
import superjson from "superjson"
import { UpdateSubscriptionDto } from "@/lib/types/subscription.type"
import { getErrorMessage, getStatusCode } from "@/lib/utils/utils"

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const result = await subscriptionService.getSubscription(id)

  if (!result.ok) {
    const status = getStatusCode(result)
    const message = getErrorMessage(result)
    return NextResponse.json({ message: message }, { status: status })
  }

  return NextResponse.json(
    {
      data: result,
      message: "Subscription fetched successfully.",
    },
    { status: 200 }
  )
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const text = await request.text()
  const body = superjson.parse<UpdateSubscriptionDto>(text)

  const result = await subscriptionService.updateSubscription(id, {
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
      data: result,
      message: "Subscription updated successfully.",
    },
    { status: 200 }
  )
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const result = await subscriptionService.deleteSubscription(id)

  if (!result.ok) {
    const status = getStatusCode(result)
    const message = getErrorMessage(result)
    return NextResponse.json({ message: message }, { status: status })
  }

  return NextResponse.json(
    {
      message: "Subscription deleted successfully.",
    },
    { status: 204 }
  )
}
