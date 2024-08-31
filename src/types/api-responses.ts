import { SearchContent, Artist, SavedTrack } from "spotify-types"
/**
 * All the spotify search types.
 */

export enum SearchType {
  ALBUM = "album",
  ARTIST = "artist",
  TRACK = "track",
  PLAYLIST = "playlist",
  AUDIOBOOK = "audiobook",
}

// Search
export type SearchListRes = SearchContent

// Artists
export type ArtistRes = Artist
export type ArtistListRes = Artist[]

// Tracks
export interface TrackListRes {
  items: SavedTrack[]
}
