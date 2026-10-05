import searchRepository, {
  type ISearchRepository,
} from "@/lib/repositories/search.repository"
import { Result } from "@/lib/types/result.type"
import { SearchResult } from "@/lib/types/search.type"
import { SubscriptionModel } from "../types/subscription.type"

export interface ISearchService {
  search(query: string): Promise<Result<SearchResult[]>>
  searchSubscription(query: string): Promise<Result<SubscriptionModel[]>>
}

class SearchService implements ISearchService {
  private readonly _cache: { query: string; result: SearchResult[] } = {
    query: "",
    result: [],
  }

  constructor(private readonly _repository: ISearchRepository) {
    this.search = this.search.bind(this)
  }

  async search(query: string): Promise<Result<SearchResult[]>> {
    if (query === this._cache.query) {
      return { ok: true, value: this._cache.result }
    }

    const result = await this._repository.search(query)

    if (!result.ok) {
      return result
    }

    this._cache.result = result.value

    return result
  }

  async searchSubscription(
    query: string
  ): Promise<Result<SubscriptionModel[]>> {
    const result = await this._repository.searchSubscription(query)
    return result
  }
}

export default new SearchService(searchRepository)
