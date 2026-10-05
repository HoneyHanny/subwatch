import { NextRequest, NextResponse } from "next/server"
import userService from "@/lib/services/user.service"
import { getErrorMessage, getStatusCode } from "@/lib/utils/utils"

export async function GET(_: NextRequest) {
  const result = await userService.getUsers()

  if (!result.ok) {
    const message = getErrorMessage(result)
    const status = getStatusCode(result)
    return NextResponse.json({ message }, { status })
  }

  return NextResponse.json({ data: result.value }, { status: 200 })
}
