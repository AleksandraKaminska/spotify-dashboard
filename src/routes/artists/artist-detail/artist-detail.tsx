import { Skeleton } from "@/components/common/skeleton"
import { Button, Container, Heading, toast, Toaster } from "@/components/ui"
import { useArtist } from "@/hooks/api/artists"
import {
  useDeleteArtist,
  useSaveArtist,
  useSavedArtists,
} from "@/hooks/api/user-artists"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

export const ArtistDetail = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const { data, isLoading, isError, error } = useArtist(id!)
  const { data: isSaved } = useSavedArtists({ ids: id, type: "artist" })

  const {
    mutateAsync: savePlaylist,
    isPending: isSavingPending,
    isError: isSaveError,
    error: saveError,
    isSuccess: isSaveSuccess,
  } = useSaveArtist()

  const {
    mutateAsync: deletePlaylist,
    isPending: isDeletingPending,
    isError: isDeleteError,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteArtist()

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
          <Heading level="h1" className="text-9xl">
            {data.name}
          </Heading>
          <Heading level="h2">
            {t("artist.followers", { number: data.followers.total })}
          </Heading>
          <Button
            size="xlarge"
            variant="secondary"
            disabled={isPending}
            onClick={() =>
              isSaved?.[0]
                ? deletePlaylist({ ids: id!, type: "artist" })
                : savePlaylist({ ids: id!, type: "artist" })
            }
          >
            {isSaved?.[0] ? t("artist.unfollow") : t("artist.follow")}
          </Button>
        </div>
      </header>
      <Toaster />
    </Container>
  )
}
