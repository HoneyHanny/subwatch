import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import subscriptionService from "@/lib/services/subscription.service"
import { getErrorMessage, getStatusCode, isError } from "@/lib/utils/utils"

// TODO: Combine both functions

const SORTABLE_COLUMNS = new Set([
  "name",
  "cost",
  "next_billing_date",
  "created_at",
  "updated_at",
  "status",
])

/**
 * Gets subscriptions per users with sorting and filtering
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params
  const sp = request.nextUrl.searchParams

  const subsOrError = await subscriptionService.getSubscriptionsByUser(userId)

  // TODO: This logic should be in service layer
  const name = sp.get("name")
  const currency = sp.get("currency")
  const billingCycle = sp.get("billingCycle")
  const nextBillingDate = sp.get("nextBillingDate")
  const category = sp.get("category")
  const status = sp.get("status")
  const costMin = sp.get("costMin")
  const costMax = sp.get("costMax")

  const sortByRaw = sp.get("sortBy") ?? "created_at"
  const sortBy = SORTABLE_COLUMNS.has(sortByRaw) ? sortByRaw : "created_at"
  const ascending = sp.get("sortOrder") === "asc"

  const page = Math.max(1, Number(sp.get("page") ?? "1"))
  const limit = Math.min(100, Math.max(1, Number(sp.get("limit") ?? "20")))
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = await createClient()
  let query = supabase
    .from("subscriptions")
    .select("*", { count: "exact" })
    .eq("user_id", userId)

  if (currency) query = query.eq("currency", currency)
  if (billingCycle) query = query.eq("billing_cycle", billingCycle)
  if (category) query = query.eq("category", category)
  if (status) query = query.eq("status", status)
  if (name) query = query.ilike("name", `%${name}%`)
  if (costMin) query = query.gte("cost", costMin)
  if (costMax) query = query.lte("cost", costMax)
  if (nextBillingDate) query = query.gte("next_billing_date", nextBillingDate)

  query = query.order(sortBy, { ascending }).range(from, to)

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json(
      { message: "Subscription not found." },
      { status: 404 }
    )
  }

  return NextResponse.json(
    {
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
      message: "Subscription fetched successfully.",
    },
    { status: 200 }
  )
}

// export async function GET(
//   _: NextRequest,
//   { params }: { params: Promise<{ userId: string }> }
// ) {
//   const { userId } = await params
//   const subsOrErr = await subscriptionService.getSubscriptionsByUser(userId)

//   if (isError(subsOrErr)) {
//     const status = getStatusCode(subsOrErr)
//     const message = getErrorMessage(subsOrErr)
//     return NextResponse.json({ message: message }, { status: status })
//   }

//   return NextResponse.json(
//     {
//       data: subsOrErr,
//       message: "Subscriptions fetched successfully.",
//     },
//     { status: 200 }
//   )
// }
