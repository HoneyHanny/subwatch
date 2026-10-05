import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { AuthStore, Profile } from "./auth.types"
import type { User } from "@supabase/supabase-js"

function buildProfile(user: User | null): Profile | null {
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name:
      user.user_metadata?.name ??
      user.user_metadata?.full_name ??
      user.email?.split("@")[0] ??
      "User",
    avatarUrl: user.user_metadata?.avatar_url,
  }
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    hasHydrated: false,

    setAuth: (session) =>
      set({
        session,
        user: session?.user ?? null,
        profile: buildProfile(session?.user ?? null),
        isLoading: false,
        hasHydrated: true,
      }),
    setLoading: (isLoading) => set({ isLoading }),
    clearAuth: () =>
      set({
        user: null,
        session: null,
        profile: null,
        isLoading: false,
        hasHydrated: true,
      }),
  }))
)
