import type { User, Session } from "@supabase/supabase-js"

export interface Profile {
  id: string
  email?: string
  name: string
  avatarUrl?: string
}

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  hasHydrated: boolean
}

interface AuthActions {
  setAuth: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  clearAuth: () => void
}

export type AuthStore = AuthState & AuthActions
