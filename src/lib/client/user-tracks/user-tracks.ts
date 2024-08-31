import { DeleteTrackReq, SaveTrackReq, TrackListRes } from "@/types"
import { deleteRequest, getRequest, putRequest } from "../common"
import { ACCESS_TOKEN_KEY } from "@/utils/constants"
import { getCookie } from "@/utils/cookies"

const accessToken = getCookie(ACCESS_TOKEN_KEY)

async function tracksList(query?: Record<string, any>) {
  return getRequest<TrackListRes>(`/api/me/tracks`, query, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function saveTrack(payload: SaveTrackReq) {
  return putRequest<void>(`/api/me/tracks`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

async function deleteTrack(payload: DeleteTrackReq) {
  return deleteRequest<void>(`/api/me/tracks`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const userTracks = {
  list: tracksList,
  update: saveTrack,
  delete: deleteTrack,
}
