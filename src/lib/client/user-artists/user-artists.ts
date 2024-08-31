import { DeleteArtistReq, SaveArtistReq } from "@/types"
import { deleteRequest, getRequest, putRequest } from "../common"
import { ACCESS_TOKEN_KEY } from "@/utils/constants"
import { getCookie } from "@/utils/cookies"

const accessToken = getCookie(ACCESS_TOKEN_KEY)

async function artistsList(payload: SaveArtistReq) {
  return getRequest<boolean[]>(`/api/me/following/contains`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function saveArtist(payload: SaveArtistReq) {
  return putRequest<void>(`/api/me/following`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function deleteArtist(payload: DeleteArtistReq) {
  return deleteRequest<void>(`/api/me/following`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const userArtists = {
  list: artistsList,
  update: saveArtist,
  delete: deleteArtist,
}
