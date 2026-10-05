"use client"

import { useState, type SubmitEvent } from "react"
import Link from "next/link"
import {
  ChartLineUpIcon,
  EnvelopeSimpleIcon,
  LockKeyIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { GoogleIcon } from "@/components/icons/google"

import { useRouter } from "next/navigation"
import { signInWithPassword } from "@/lib/utils/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { replace } = useRouter()

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const email = (
        e.currentTarget.elements.namedItem("email") as HTMLInputElement
      ).value
      const password = (
        e.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value
      const { error } = await signInWithPassword(email, password)

      if (error) {
        setError(error.message)
        return
      }

      replace("/dashboard")
    } catch {
      setError("Something went wrong. Check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-dot-grid flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex size-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <ChartLineUpIcon className="size-5" weight="bold" />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Subscription tracker
            </p>
            <p className="text-lg font-semibold text-foreground">Subwatch</p>
          </div>
        </div>

        {/* Panel */}
        <Card className="rounded-xl border-border/60 bg-panel shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to keep track of every subscription in one place.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {error && (
              <Alert
                variant="destructive"
                className="border-destructive/25 bg-destructive/10"
              >
                <WarningCircleIcon className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              variant="outline"
              className="w-full border-border/60 bg-background hover:border-ring/50 hover:bg-muted"
              onClick={() => {
                // wire up to your OAuth2 flow, e.g. signIn("google")
              }}
            >
              <GoogleIcon className="size-4" />
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border/60" />
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-border/60" />
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <EnvelopeSimpleIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={cn(
                      "border-border/60 bg-background pl-9",
                      "focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/15"
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <LockKeyIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={cn(
                      "border-border/60 bg-background px-9",
                      "focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/15"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full border-t border-t-white/20 bg-linear-to-b from-primary to-primary/90 text-primary-foreground hover:border-t-white/30 hover:to-primary/80 hover:shadow-md hover:shadow-primary/25 active:shadow-none disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
                <ArrowRightIcon className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
