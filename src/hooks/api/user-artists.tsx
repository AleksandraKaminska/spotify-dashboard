import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { DeleteArtistReq, SaveArtistReq } from "@/types"
import { queryClient } from "@/lib/query-client"

const USER_ARTISTS_QUERY_KEY = "user-artists"
export const userArtistsQueryKeys = queryKeysFactory(USER_ARTISTS_QUERY_KEY)

export const useSavedArtists = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<boolean[], Error, boolean[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: userArtistsQueryKeys.list(query),
    queryFn: () => client.userArtists.list(query),
    ...options,
  })
}

export const useSaveArtist = (
  options?: UseMutationOptions<void, Error, SaveArtistReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.userArtists.update(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: userArtistsQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteArtist = (
  options?: UseMutationOptions<void, Error, DeleteArtistReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.userArtists.delete(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: userArtistsQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
