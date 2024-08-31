import { Skeleton } from "@/components/common/skeleton"
import { Tracks } from "@/components/common/tracks"
import {
  Container,
  Heading,
  IconButton,
  Text,
  toast,
  Toaster,
} from "@/components/ui"
import { usePlaylist } from "@/hooks/api/playlist"
import {
  useDeletePlaylist,
  useSavePlaylist,
  useSavedPlaylists,
} from "@/hooks/api/user-playlists"
import { CircleCheck, CirclePlus } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Paging, SimplifiedTrack } from "spotify-types"

export const PlaylistDetail = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const {
    mutateAsync: savePlaylist,
    isPending: isSavingPending,
    isError: isSaveError,
    error: saveError,
    isSuccess: isSaveSuccess,
  } = useSavePlaylist()
  const {
    mutateAsync: deletePlaylist,
    isPending: isDeletingPending,
    isError: isDeleteError,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  } = useDeletePlaylist()

  const isPending = isSavingPending || isDeletingPending

  const { data, isLoading, isError, error } = usePlaylist(id!)
  const { data: isSaved } = useSavedPlaylists(id)

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
    <Container className="p-4">
      <header className="flex items-end gap-16 border-b pb-8">
        <img
          src={data.images[0].url}
          alt={`${data.name} background image`}
          width={data.images[0].width ?? 600}
          height={data.images[0].height ?? 600}
          className="h-96 w-96 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-4">
          <Text className="text-xl capitalize">{data.type}</Text>
          <Heading level="h1" className="text-6xl">
            {data.name}
          </Heading>
          <Text>{data.description}</Text>
          <Heading level="h2">{data.owner.display_name}</Heading>
          <Heading level="h2">
            {t("artist.followers", { number: data.followers.total })}
          </Heading>
          <IconButton
            className="text-ui-fg-interactive"
            variant="transparent"
            disabled={isPending}
            onClick={() => (isSaved[0] ? deletePlaylist(id) : savePlaylist(id))}
          >
            {isSaved[0] ? <CircleCheck /> : <CirclePlus />}
          </IconButton>
        </div>
      </header>
      <Tracks tracks={data.tracks as Paging<SimplifiedTrack>} className="p-8" />
      <Toaster />
    </Container>
  )
}
