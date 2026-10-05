import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import userService from "@/lib/services/user.service"
import { getErrorMessage, getStatusCode } from "@/lib/utils/utils"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 400 }
    )
  }

  const result = await userService.createUser({
    email,
    name,
    password,
  })

  if (!result.ok) {
    return NextResponse.json(
      { message: getErrorMessage(result.error) },
      { status: getStatusCode(result.error) }
    )
  } else {
    return NextResponse.json({ user: result.value }, { status: 201 })
  }
}
