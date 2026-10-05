import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const supabase = await createClient()

  try {
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", data.user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ user: data.user, name: null })
    }

    return NextResponse.json({ user: data.user, name: profile?.name ?? null })
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
