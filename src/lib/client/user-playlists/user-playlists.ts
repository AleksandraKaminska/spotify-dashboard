import { deleteRequest, getRequest, putRequest } from "../common"
import { ACCESS_TOKEN_KEY } from "@/utils/constants"
import { getCookie } from "@/utils/cookies"

const accessToken = getCookie(ACCESS_TOKEN_KEY)

async function retrievePlaylist(id: string, query?: Record<string, any>) {
  return getRequest<boolean[]>(
    `/api/playlists/${id}/followers/contains`,
    query,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

async function savePlaylist(id: string) {
  return putRequest<void>(`/api/playlists/${id}/followers`, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function deletePlaylist(id: string) {
  return deleteRequest<void>(`/api/playlists/${id}/followers`, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const userPlaylists = {
  retrieve: retrievePlaylist,
  update: savePlaylist,
  delete: deletePlaylist,
}
