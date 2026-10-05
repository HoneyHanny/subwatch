"use client"

import { type SubmitEvent, useState } from "react"
import Link from "next/link"
import {
  ChartLineUpIcon,
  UserIcon,
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { GoogleIcon } from "@/components/icons/google"

const inputClasses = cn(
  "border-border/60 bg-background pl-9",
  "focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/15"
)

const inputErrorClasses = cn(
  "border-[oklch(0.577_0.245_27.325)] bg-background pl-9",
  "focus-visible:border-[oklch(0.577_0.245_27.325)] focus-visible:ring-4 focus-visible:ring-[oklch(0.577_0.245_27.325)]/15"
)

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1 text-[11px] text-[oklch(0.577_0.245_27.325)]">
      <WarningCircleIcon className="size-3.5 shrink-0" weight="fill" />
      {message}
    </p>
  )
}

type FormErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function validate(formData: FormData): FormErrors {
    const errs: FormErrors = {}

    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim()
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string
    const terms = formData.get("terms")

    if (!name) {
      errs.name = "Full name is required."
    }

    if (!email) {
      errs.email = "Email is required."
    } else if (!validateEmail(email)) {
      errs.email = "Please enter a valid email address."
    }

    if (!password) {
      errs.password = "Password is required."
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters."
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password."
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match."
    }

    if (!terms) {
      errs.terms = "You must agree to the terms to continue."
    }

    return errs
  }

  // MARK: handleSubmit
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setApiError(null)

    const formData = new FormData(e.currentTarget)
    const validationErrors = validate(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    const email = (formData.get("email") as string).trim()
    const password = formData.get("password") as string
    const name = (formData.get("name") as string).trim()

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        )
      }
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsLoading(false)
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
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Start tracking every subscription and never miss a renewal.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* API Error Banner */}
            {apiError && (
              <div className="flex items-center gap-2 rounded-lg border border-[oklch(0.577_0.245_27.325)]/25 bg-[oklch(0.577_0.245_27.325)]/10 px-3 py-2.5 text-sm text-[oklch(0.577_0.245_27.325)]">
                <WarningCircleIcon className="size-4 shrink-0" weight="fill" />
                {apiError}
              </div>
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

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Full name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <UserIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Cooper"
                    autoComplete="name"
                    className={errors.name ? inputErrorClasses : inputClasses}
                    onChange={() =>
                      errors.name &&
                      setErrors((prev) => ({ ...prev, name: undefined }))
                    }
                  />
                </div>
                <FieldError message={errors.name} />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <EnvelopeSimpleIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={errors.email ? inputErrorClasses : inputClasses}
                    onChange={() =>
                      errors.email &&
                      setErrors((prev) => ({ ...prev, email: undefined }))
                    }
                  />
                </div>
                <FieldError message={errors.email} />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockKeyIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={cn(
                      errors.password ? inputErrorClasses : inputClasses,
                      "pr-9"
                    )}
                    onChange={() =>
                      errors.password &&
                      setErrors((prev) => ({ ...prev, password: undefined }))
                    }
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
                {errors.password ? (
                  <FieldError message={errors.password} />
                ) : (
                  <p className="text-[11px] text-muted-foreground">
                    Must be at least 8 characters.
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="relative">
                  <LockKeyIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={cn(
                      errors.confirmPassword ? inputErrorClasses : inputClasses,
                      "pr-9"
                    )}
                    onChange={() =>
                      errors.confirmPassword &&
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirm ? (
                      <EyeSlashIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
                <FieldError message={errors.confirmPassword} />
              </div>

              {/* Terms */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    id="terms"
                    name="terms"
                    value="accepted"
                    className={cn(
                      "mt-0.5",
                      errors.terms
                        ? "border-[oklch(0.577_0.245_27.325)]"
                        : "border-border/60"
                    )}
                    onCheckedChange={() =>
                      errors.terms &&
                      setErrors((prev) => ({ ...prev, terms: undefined }))
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs leading-relaxed font-normal text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <FieldError message={errors.terms} />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-1 w-full border-t border-t-white/20 bg-linear-to-b from-primary to-primary/90 text-primary-foreground hover:border-t-white/30 hover:to-primary/80 hover:shadow-md hover:shadow-primary/25 active:shadow-none disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="size-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRightIcon className="size-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
