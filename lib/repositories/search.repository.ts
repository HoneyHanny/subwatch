import { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { Result } from "../types/result.type"
import { SearchResult } from "../types/search.type"
import { BadRequest } from "../types/errors.type"
import { SubscriptionModel } from "../types/subscription.type"

export interface ISearchRepository {
  search(query: string): Promise<Result<SearchResult[]>>
  searchSubscription(query: string): Promise<Result<SubscriptionModel[]>>
}

class SearchRepository<
  T extends () => Promise<SupabaseClient>,
> implements ISearchRepository {
  constructor(private readonly _database: T) {
    this.search = this.search.bind(this)
  }

  async search(query: string): Promise<Result<SearchResult[]>> {
    const database = await this._database()
    const limit = 5

    const [usersResult, subscriptionsResult] = await Promise.all([
      database
        .from("profile")
        .select("id, name, email")
        .textSearch("fts", query, { type: "websearch", config: "english" })
        .limit(limit),
      database
        .from("subscriptions")
        .select("id, name")
        .textSearch("fts", query, { type: "websearch", config: "english" })
        .limit(limit),
    ])

    if (usersResult.error || subscriptionsResult.error) {
      return { ok: false, error: new BadRequest() }
    }

    return {
      ok: true,
      value: [
        ...usersResult.data.map((u) => ({
          type: "user" as const,
          id: u.id,
          label: u.name,
        })),
        ...subscriptionsResult.data.map((s) => ({
          type: "subscription" as const,
          id: s.id,
          label: s.name,
        })),
      ],
    }
  }

  async searchSubscription(
    query: string
  ): Promise<Result<SubscriptionModel[]>> {
    const database = await this._database()
    const limit = 5

    const { data, error } = await database
      .from("subscriptions")
      .select()
      .textSearch("fts", query, { type: "websearch", config: "english" })
      .limit(limit)

    if (error) {
      return { ok: false, error: new BadRequest() }
    }

    return {
      ok: true,
      value: data,
    }
  }
}

export default new SearchRepository<() => Promise<SupabaseClient>>(createClient)
