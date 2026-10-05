import * as React from "react"

import { cn } from "@/lib/utils/utils"

export default function AppViewport({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex h-screen w-full flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}
