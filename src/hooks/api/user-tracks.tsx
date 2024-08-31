import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"
import { client } from "@/lib/client"
import { queryKeysFactory } from "@/lib/query-key-factory"
import { DeleteTrackReq, SaveTrackReq, TrackListRes } from "@/types"
import { queryClient } from "@/lib/query-client"

const USER_TRACKS_QUERY_KEY = "user-tracks"
export const userTracksQueryKeys = queryKeysFactory(USER_TRACKS_QUERY_KEY)

export const useSavedTracks = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<TrackListRes, Error, TrackListRes>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery({
    queryKey: userTracksQueryKeys.list(query),
    queryFn: () => client.userTracks.list(query),
    ...options,
  })
}

export const useSaveTrack = (
  options?: UseMutationOptions<void, Error, SaveTrackReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.userTracks.update(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: userTracksQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteTrack = (
  options?: UseMutationOptions<void, Error, DeleteTrackReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.userTracks.delete(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: userTracksQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
