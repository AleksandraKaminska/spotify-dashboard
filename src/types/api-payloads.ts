// User
export interface SaveTrackReq {
  ids: string
}
export interface DeleteTrackReq {
  ids: string
}

export interface SaveAlbumReq {
  ids: string
}
export interface DeleteAlbumReq {
  ids: string
}

export interface SaveArtistReq {
  ids: string
  type: string
}
export interface DeleteArtistReq {
  ids: string
  type: string
}
