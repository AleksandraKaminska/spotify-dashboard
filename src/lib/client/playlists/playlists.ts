import { PlaylistRes } from "@/types"
import { getRequest } from "../common"

async function retrievePlaylist(id: string, query?: Record<string, any>) {
  return getRequest<PlaylistRes>(`/api/playlists/${id}`, query)
}

export const playlists = {
  retrieve: retrievePlaylist,
}
