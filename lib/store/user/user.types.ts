import type { User, Session } from '@supabase/supabase-js'

export interface User {
  id: string
  name: string
  email: string
}

export interface UserState {
  user: User | null
  session: Session | null
  isLoading: boolean
}

export interface UserActions {
  setUser: (user: User) => void
  logout: () => void
  setLoading: (value: boolean) => void
}

export type UserStore = UserState & UserActions
