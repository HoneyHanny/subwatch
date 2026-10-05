import { NextRequest, NextResponse } from "next/server"
import searchService from "@/lib/services/search.service"
import { getErrorMessage, getStatusCode } from "@/lib/utils/utils"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    return NextResponse.json({ message: "Query required" }, { status: 400 })
  }

  const result = await searchService.search(query)

  if (!result.ok) {
    const status = getStatusCode(result)
    const message = getErrorMessage(result)
    return NextResponse.json({ message }, { status })
  }

  return NextResponse.json({ data: result.value }, { status: 200 })
}
