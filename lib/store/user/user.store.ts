import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { UserStore } from "./user.types"

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,

        setUser: (user) => set({ user }, false, "user/setUser"),

        logout: () => set({ user: null }, false, "user/logout"),

        setLoading: (value) =>
          set({ isLoading: value }, false, "user/setLoading"),
      }),
      {
        name: "user-storage",
      }
    )
  )
)
