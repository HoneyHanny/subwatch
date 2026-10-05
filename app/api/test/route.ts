import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const query = searchParams.get("page") // single value
  const tags = searchParams.getAll("page") // multiple values (?tag=js&tag=react)
  const hasPage = searchParams.has("page")

  console.log(query, tags, hasPage)

  return NextResponse.json(
    { message: "Hello from the test route!" },
    { status: 200 }
  )
}
