import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// TODO: Move to a service layer and repository and add proper error handling and logging
export async function DELETE() {
  const supabase = await createClient()

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims()

  if (claimsError || !claimsData?.claims) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 503 })
  }

  return NextResponse.json({
    message: "Logged out successfully",
    success: true,
  })
}
