import { Skeleton } from "@/components/common/skeleton"
import { clx, Heading, IconButton, Text, toast, Toaster } from "@/components/ui"
import {
  useDeleteTrack,
  useSavedTracks,
  useSaveTrack,
} from "@/hooks/api/user-tracks"
import { CircleCheck, CirclePlus } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Paging, SimplifiedTrack } from "spotify-types"

export const Tracks = ({
  tracks,
  className,
}: {
  tracks: Paging<SimplifiedTrack>
  className?: string
}) => {
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useSavedTracks()

  const {
    mutateAsync: saveTrack,
    isPending: isSavingPending,
    isError: isSaveError,
    error: saveError,
    isSuccess: isSaveSuccess,
  } = useSaveTrack()
  const {
    mutateAsync: deleteTrack,
    isPending: isDeletingPending,
    isError: isDeleteError,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteTrack()

  const isPending = isSavingPending || isDeletingPending

  useEffect(() => {
    if (isSaveError && saveError) {
      toast.error(t("errorBoundary.defaultTitle"), {
        description: saveError.message,
      })
    }
  }, [isSaveError, saveError])

  useEffect(() => {
    if (isDeleteError && deleteError) {
      toast.error(t("errorBoundary.defaultTitle"), {
        description: deleteError.message,
      })
    }
  }, [isDeleteError, deleteError])

  useEffect(() => {
    if (isSaveSuccess) {
      toast.success(t("general.success"))
    }
  }, [isSaveSuccess])

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(t("general.success"))
    }
  }, [isDeleteSuccess])

  if (isLoading || !data) {
    return <Skeleton />
  }

  if (isError) {
    throw error
  }

  return (
    <ul className={clx("grid list-inside gap-6", className)}>
      {tracks.items.map((item, i) => (
        <li key={item.id} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Text className="text-ui-fg-muted" size="large">
              {i + 1}
            </Text>
            <div>
              <Heading level="h3">{item.name}</Heading>
              <Text className="text-ui-fg-subtle">
                {(item as SimplifiedTrack).artists
                  ?.map(({ name }) => name)
                  ?.join(" · ")}
              </Text>
            </div>
          </div>
          <IconButton
            className="text-ui-fg-interactive"
            variant="transparent"
            disabled={isPending}
            onClick={() =>
              data?.items.some(({ track }) => track.id === item.id)
                ? deleteTrack({ ids: item.id })
                : saveTrack({ ids: item.id })
            }
          >
            {data?.items.some(({ track }) => track.id === item.id) ? (
              <CircleCheck />
            ) : (
              <CirclePlus />
            )}
          </IconButton>
        </li>
      ))}
      <Toaster />
    </ul>
  )
}
