import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { ArtistListRes, ArtistRes } from "@/types"

const ARTIST_QUERY_KEY = "artists"
export const artistsQueryKeys = queryKeysFactory(ARTIST_QUERY_KEY)

export const useArtist = (
  id: string,
  options?: Omit<
    UseQueryOptions<ArtistRes, Error, ArtistRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: artistsQueryKeys.detail(id),
    queryFn: async () => client.artists.retrieve(id),
    ...options,
  })
}

export const useArtists = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<ArtistListRes, Error, ArtistListRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: artistsQueryKeys.list(query),
    queryFn: () => client.artists.list(query),
    ...options,
  })
}
