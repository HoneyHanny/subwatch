// utils/auth.ts
import { createClient } from "@/lib/supabase/client"

export async function signOut() {
  const supabase = createClient()
  return supabase.auth.signOut()
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient()
  return supabase.auth.signInWithPassword({ email, password })
}
