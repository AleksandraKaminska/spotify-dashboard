import {
  SearchContent,
  Artist,
  SavedTrack,
  Album,
  Playlist,
  Paging,
} from "spotify-types"
/**
 * All the spotify search types.
 */

export enum SearchType {
  ALBUM = "album",
  ARTIST = "artist",
  TRACK = "track",
  PLAYLIST = "playlist",
}

// Search
export type SearchListRes = Paging<SearchContent>

// Artists
export type ArtistRes = Artist

// Albums
export type AlbumRes = Album

// Playlists
export type PlaylistRes = Playlist

// Tracks
export interface TrackListRes {
  items: SavedTrack[]
}
