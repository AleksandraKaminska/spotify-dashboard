import { ArtistDTO } from "./artist"

export interface DeleteRes {
  id: string
  object: string
  deleted: true
}

// Artists
export type ArtistRes = ArtistDTO[]
export type ArtistListRes = ArtistDTO[]
