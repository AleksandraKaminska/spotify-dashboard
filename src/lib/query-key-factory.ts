import { QueryKey, UseQueryOptions } from "@tanstack/react-query"

export interface TQueryKey<TKey, TListQuery = any, TDetailQuery = string> {
  all: readonly [TKey]
  lists: () => readonly [...TQueryKey<TKey>["all"], "list"]
  list: (
    query?: TListQuery
  ) => readonly [
    ...ReturnType<TQueryKey<TKey>["lists"]>,
    { query: TListQuery | undefined },
  ]
  details: () => readonly [...TQueryKey<TKey>["all"], "detail"]
  detail: (
    id: TDetailQuery,
    query?: TListQuery
  ) => readonly [
    ...ReturnType<TQueryKey<TKey>["details"]>,
    TDetailQuery,
    { query: TListQuery | undefined },
  ]
}

export type UseQueryOptionsWrapper<
  // Return type of queryFn
  TQueryFn = unknown,
  // Type thrown in case the queryFn rejects
  E = Error,
  // Query key type
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFn, E, TQueryFn, TQueryKey>,
  "queryKey" | "queryFn"
>

export const queryKeysFactory = <
  T,
  TListQueryType = any,
  TDetailQueryType = string,
>(
  globalKey: T
) => {
  const queryKeyFartisty: TQueryKey<T, TListQueryType, TDetailQueryType> = {
    all: [globalKey],
    lists: () => [...queryKeyFartisty.all, "list"],
    list: (query?: TListQueryType) => [...queryKeyFartisty.lists(), { query }],
    details: () => [...queryKeyFartisty.all, "detail"],
    detail: (id: TDetailQueryType, query?: TListQueryType) => [
      ...queryKeyFartisty.details(),
      id,
      { query },
    ],
  }
  return queryKeyFartisty
}
