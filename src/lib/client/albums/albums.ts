import { AlbumRes } from "@/types"
import { getRequest } from "../common"

async function retrieveAlbum(id: string, query?: Record<string, any>) {
  return getRequest<AlbumRes>(`/api/albums/${id}`, query)
}

export const albums = {
  retrieve: retrieveAlbum,
}
