import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { PlaylistRes } from "@/types"

const ALBUM_QUERY_KEY = "playlists"
export const artistsQueryKeys = queryKeysFactory(ALBUM_QUERY_KEY)

export const usePlaylist = (
  id: string,
  options?: Omit<
    UseQueryOptions<PlaylistRes, Error, PlaylistRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: artistsQueryKeys.detail(id),
    queryFn: async () => client.playlists.retrieve(id),
    ...options,
  })
}
