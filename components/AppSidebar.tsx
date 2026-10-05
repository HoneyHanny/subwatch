"use client"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth/auth.store"
import Image from "next/image"
import icon from "@/app/favicon.ico"
import {
  SquaresFourIcon,
  CreditCardIcon,
  UserIcon,
  SignOutIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/utils/auth"

export default function Page() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((u) => u.profile)

  const handleLogout = async () => {
    try {
      const { error } = await signOut()
      if (error) throw error
      router.replace("/login?from=logout")
    } catch (error) {
      console.error(error)
    }
  }

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <SquaresFourIcon size={16} />,
    },
    {
      title: "Subscriptions",
      href: "/subscriptions",
      icon: <CreditCardIcon size={16} />,
    },
    // TODO: Remove this
    {
      title: user && user.name ? user.name : "",
      href: "/user",
      icon: <UserIcon size={16} />,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-start gap-2">
        <Image src={icon} alt="Subwatch Logo" width={32} height={32} />
        <div className="flex flex-col items-start justify-center font-bold">
          Subwatch
          <span className="text-xs font-normal text-muted-foreground">
            INTELLIGENCE
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-0.5">
            {items.map((item) => (
              <SidebarMenuItem
                onClick={() => {
                  localStorage.setItem("sidebar-active-item", item.href)
                }}
                key={item.href}
              >
                <SidebarMenuButton
                  className="data-active:bg-primary-a data-active:hover:bg-primary"
                  render={<Link href={item.href} />}
                  isActive={pathname === item.href}
                >
                  {item.icon}
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Button variant="ghost" className="mt-4 w-full justify-start" onClick={handleLogout}>
            <SignOutIcon />
            Sign out
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
