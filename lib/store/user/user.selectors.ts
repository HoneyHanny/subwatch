import { useUserStore } from "./user.store"

export const useUser = () => useUserStore((state) => state.user)

export const useIsAuthenticated = () => useUserStore((state) => !!state.user)

export const useUserLoading = () => useUserStore((state) => state.isLoading)
