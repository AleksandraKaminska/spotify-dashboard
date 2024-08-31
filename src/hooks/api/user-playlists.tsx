import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { queryClient } from "@/lib/query-client"

const USER_PLAYLISTS_QUERY_KEY = "user-playlists"
export const userPlaylistsQueryKeys = queryKeysFactory(USER_PLAYLISTS_QUERY_KEY)

export const useSavedPlaylists = (
  id: string,
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<boolean[], Error, boolean[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: userPlaylistsQueryKeys.list(query),
    queryFn: () => client.userPlaylists.retrieve(id, query),
    ...options,
  })
}

export const useSavePlaylist = (
  options?: UseMutationOptions<void, Error, void>
) => {
  return useMutation({
    mutationFn: (id) => client.userPlaylists.update(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: userPlaylistsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeletePlaylist = (
  options?: UseMutationOptions<void, Error, void>
) => {
  return useMutation({
    mutationFn: (id) => client.userPlaylists.delete(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: userPlaylistsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
