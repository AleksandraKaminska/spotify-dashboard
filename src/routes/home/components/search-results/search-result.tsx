import { NoResults } from "@/components/common/empty-content"
import {
  Heading,
  IconButton,
  InfoBox,
  Text,
  toast,
  Toaster,
} from "@/components/ui"
import {
  useDeleteTrack,
  useSavedTracks,
  useSaveTrack,
} from "@/hooks/api/user-tracks"
import { CircleCheck, CirclePlus } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  Artist,
  SearchContent,
  SimplifiedAlbum,
  SimplifiedTrack,
} from "spotify-types"

interface Props {
  results: SearchContent[keyof SearchContent]
}

export const SearchResult = ({ results }: Props) => {
  const { t } = useTranslation()
  const {
    mutateAsync: saveTrack,
    isPending: isSavingPending,
    isError: isSaveError,
    error: saveError,
    isSuccess: isSaveSuccess,
  } = useSaveTrack()
  const { data } = useSavedTracks()
  const {
    mutateAsync: deleteTrack,
    isPending: isDeletingPending,
    isError: isDeleteError,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteTrack()

  const isPending = isSavingPending || isDeletingPending

  const hasNoResults =
    results?.items.length === 0 ||
    results?.items.filter((item) => item).length === 0

  const getPath = (item: { href: string }) =>
    item.href.replace("https://api.spotify.com/v1", "")

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

  if (!results) return null

  return (
    <>
      {hasNoResults ? (
        <NoResults />
      ) : (
        <>
          {"images" in results.items[0] ? (
            <ul className="grid grid-cols-7 gap-4">
              {results.items.map((item) => (
                <li key={item.id}>
                  <Link to={getPath(item)}>
                    <InfoBox
                      className="h-full"
                      label={item.name}
                      image={(item as Artist).images?.[0]?.url ?? ""}
                      description={(item as SimplifiedAlbum).artists
                        ?.map(({ name }) => name)
                        ?.join(" · ")}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid list-inside gap-6">
              {results.items.map((item, i) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
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
            </ul>
          )}
          <Toaster />
        </>
      )}
    </>
  )
}
