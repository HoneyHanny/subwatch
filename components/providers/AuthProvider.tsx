// components/AuthProvider.tsx
"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/auth/auth.store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.localStorage.removeItem("user-auth")
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.getState().setAuth(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <>{children}</>
}
