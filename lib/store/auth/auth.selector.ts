import { useAuthStore } from "./auth.store"

export const useUser = () => useAuthStore((state) => state.user)

export const useIsAuthenticated = () =>
  useAuthStore((state) => !!state.user && !!state.session)

export const useUserLoading = () => useAuthStore((state) => state.isLoading)
