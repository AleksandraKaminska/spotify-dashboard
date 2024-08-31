import { DeleteAlbumReq, SaveAlbumReq } from "@/types"
import { deleteRequest, getRequest, putRequest } from "../common"
import { ACCESS_TOKEN_KEY } from "@/utils/constants"
import { getCookie } from "@/utils/cookies"

const accessToken = getCookie(ACCESS_TOKEN_KEY)

async function albumsList(payload: SaveAlbumReq) {
  return getRequest<boolean[]>(`/api/me/albums/contains`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function saveAlbum(payload: SaveAlbumReq) {
  return putRequest<void>(`/api/me/albums`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function deleteAlbum(payload: DeleteAlbumReq) {
  return deleteRequest<void>(`/api/me/albums`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const userAlbums = {
  list: albumsList,
  update: saveAlbum,
  delete: deleteAlbum,
}
