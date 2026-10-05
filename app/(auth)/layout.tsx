"use client"
import AppSidebar from "@/components/AppSidebar"
import AppViewport from "@/components/AppViewport"
import Header from "@/components/Header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useAuthStore } from "@/lib/store/auth/auth.store"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  const profile = useAuthStore((s) => s.profile)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && !profile) {
      router.replace("/login")
    }
  }, [profile, router, hasHydrated])

  if (!hasHydrated || !profile) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <AppViewport>
        <Header />
        <main className="min-h-0 flex-1 overflow-hidden p-5">{children}</main>
      </AppViewport>
    </SidebarProvider>
  )
}
