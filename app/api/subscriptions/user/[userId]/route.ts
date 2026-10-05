import { NextRequest, NextResponse } from "next/server"
import subscriptionService from "@/lib/services/subscription.service"
import { getErrorMessage, getStatusCode, isError } from "@/lib/utils/utils"

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params
  const subsOrErr = await subscriptionService.getSubscriptionsByUser(userId)

  if (isError(subsOrErr)) {
    const status = getStatusCode(subsOrErr)
    const message = getErrorMessage(subsOrErr)
    return NextResponse.json({ message: message }, { status: status })
  }

  return NextResponse.json(
    {
      data: subsOrErr,
      message: "Subscriptions fetched successfully.",
    },
    { status: 200 }
  )
}
