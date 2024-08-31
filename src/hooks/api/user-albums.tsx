import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { DeleteAlbumReq, SaveAlbumReq, AlbumListRes } from "@/types"
import { queryClient } from "@/lib/query-client"

const USER_ALBUMS_QUERY_KEY = "user-albums"
export const userAlbumsQueryKeys = queryKeysFactory(USER_ALBUMS_QUERY_KEY)

export const useSavedAlbums = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<AlbumListRes, Error, AlbumListRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: userAlbumsQueryKeys.list(query),
    queryFn: () => client.userAlbums.list(query),
    ...options,
  })
}

export const useSaveAlbum = (
  options?: UseMutationOptions<void, Error, SaveAlbumReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.userAlbums.update(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: userAlbumsQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteAlbum = (
  options?: UseMutationOptions<void, Error, DeleteAlbumReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.userAlbums.delete(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: userAlbumsQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
