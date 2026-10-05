import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

function redirectWithCookies(
  destination: string,
  request: NextRequest,
  response: NextResponse
) {
  const redirectResponse = NextResponse.redirect(
    new URL(destination, request.url)
  )

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie)
  })

  return redirectResponse
}

export async function proxy(request: NextRequest) {
  const { response, isAuthenticated } = await updateSession(request)
  const { pathname } = request.nextUrl
  const isProtectedRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/")
  const isAuthPage = pathname === "/login" || pathname === "/register"

  if (pathname === "/") {
    return redirectWithCookies(
      isAuthenticated ? "/dashboard" : "/login",
      request,
      response
    )
  }

  if (isProtectedRoute && !isAuthenticated) {
    return redirectWithCookies("/login", request, response)
  }

  if (isAuthPage && isAuthenticated) {
    return redirectWithCookies("/dashboard", request, response)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}