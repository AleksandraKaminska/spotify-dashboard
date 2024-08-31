import { ArtistRes } from "@/types"
import { getRequest } from "../common"

async function retrieveArtist(id: string, query?: Record<string, any>) {
  return getRequest<ArtistRes>(`/api/artists/${id}`, query)
}

export const artists = {
  retrieve: retrieveArtist,
}
