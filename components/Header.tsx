import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { CreateSubscriptionDto } from "@/lib/types/subscription.type"

import {
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
} from "@phosphor-icons/react"
import { KeyboardEvent, MouseEvent, useState } from "react"
import superjson from "superjson"

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const search = async (searchTerm: string) => {
    // TODO: Call an API route here

    const response = await fetch("/api/search", {
      method: "GET",
    })
  }

  const handleSearchEnter = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      await search(searchTerm)
    }
  }

  const handleSearchClick = async (event: MouseEvent) => {
    await search(searchTerm)
  }

  const handleNewSubscriptionClick = async (event: any) => {
    try {
      const dto: CreateSubscriptionDto = {
        userId: "47dae9de-8d11-40e5-9135-04dcfb11b771",
        name: "Hostinger",
        cost: 7,
        currency: "USD",
        billingCycle: "monthly",
        nextBillingDate: new Date("2026-10-28T00:00:00.000Z"),
        category: "Hosting",
        status: "active",
      }

      const response = await fetch("api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: superjson.stringify(dto),
      })

      if (!response.ok) {
        try {
          const err = await response.json()
          console.error(err)
        } catch (error) {
          console.error(error)
        } finally {
          return
        }
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  // TODO: Add solid orange pinging circle to bell icon
  return (
    <header className="flex h-16 w-full items-center justify-between border-b px-4">
      <div>
        <InputGroup>
          <InputGroupInput
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.currentTarget.value)
            }}
            placeholder="Search Subwatch subscriptions, invoices, vendors..."
            className="lg:min-w-94"
            onKeyDown={handleSearchEnter}
          />

          <InputGroupAddon align="inline-end">
            <MagnifyingGlassIcon
              size={32}
              onClick={handleSearchClick}
              className="hover:cursor-pointer active:scale-90 active:opacity-80"
            />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-around flex items-center gap-4">
        <Button variant="outline">$ USD </Button>
        <BellIcon size={16} />
        <Button onClick={handleNewSubscriptionClick}>
          <PlusIcon /> New Subscription
        </Button>
        <Avatar className="flex items-center justify-center">
          <UserIcon size={16} />
        </Avatar>
      </div>
    </header>
  )
}

export default Header
