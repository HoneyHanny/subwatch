import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import userService from "@/lib/services/user.service"
import { getErrorMessage, getStatusCode } from "@/lib/utils/utils"

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const result = await userService.getUser(id)

  if (!result.ok) {
    const message = getErrorMessage(result)
    const status = getStatusCode(result)
    return NextResponse.json({ message }, { status })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const result = await userService.updateUser(id, body)

  if (!result.ok) {
    const message = getErrorMessage(result)
    const status = getStatusCode(result)
    return NextResponse.json({ message }, { status })
  }

  return NextResponse.json({ data: result.value }, { status: 200 })
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  const { subscriptionId } = await params

  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", subscriptionId)

    if (error) {
      return NextResponse.json(
        { message: "Failed to delete subscription." },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Subscription deleted successfully." },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: Failed to delete subscription." },
      { status: 500 }
    )
  }
}
