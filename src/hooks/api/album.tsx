import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { AlbumRes } from "@/types"

const ALBUM_QUERY_KEY = "albums"
export const artistsQueryKeys = queryKeysFactory(ALBUM_QUERY_KEY)

export const useAlbum = (
  id: string,
  options?: Omit<
    UseQueryOptions<AlbumRes, Error, AlbumRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: artistsQueryKeys.detail(id),
    queryFn: async () => client.albums.retrieve(id),
    ...options,
  })
}

