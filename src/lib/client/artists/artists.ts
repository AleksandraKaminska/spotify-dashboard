import { ArtistListRes, ArtistRes } from "@/types"
import { getRequest } from "../common"

async function listArtists(query?: Record<string, any>) {
  return getRequest<ArtistListRes>(`/api/artists`, query)
}

async function retrieveArtist(id: string, query?: Record<string, any>) {
  return getRequest<ArtistRes>(`/api/artists/${id}`, query)
}

export const artists = {
  list: listArtists,
  retrieve: retrieveArtist,
}
