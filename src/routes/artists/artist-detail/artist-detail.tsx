import { Skeleton } from "@/components/common/skeleton"
import { Button, Container, Heading } from "@/components/ui"
import { useArtist } from "@/hooks/api/artists"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

export const ArtistDetail = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const { data, isLoading, isError, error } = useArtist(id!)

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
          <Button size="xlarge" variant="secondary">
            {t("artist.follow")}
          </Button>
        </div>
      </header>
    </Container>
  )
}
