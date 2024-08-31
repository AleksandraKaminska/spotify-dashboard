import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { SearchListRes } from "@/types"

const SEARCH_QUERY_KEY = "search"
export const searchQueryKeys = queryKeysFactory(SEARCH_QUERY_KEY)

export const useSearch = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<SearchListRes, Error, SearchListRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery<SearchListRes>({
    queryKey: searchQueryKeys.list(query),
    queryFn: () => client.search.list(query),
    ...options,
  })
}
