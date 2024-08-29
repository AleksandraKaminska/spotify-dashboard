import { NoResults } from "@/components/common/empty-content"
import { Heading, InfoBox, Text } from "@/components/ui"
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
  const hasNoResults =
    results?.items.length === 0 ||
    results?.items.filter((item) => item).length === 0

  const getPath = (item: { href: string }) =>
    item.href.replace("https://api.spotify.com/v1", "")

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
                  {/* <IconButton
                      className="absolute right-2 top-2 text-ui-fg-interactive"
                      variant="transparent"
                    >
                      <Heart />
                    </IconButton> */}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid list-inside gap-6">
              {results.items.map((item, i) => (
                <li key={item.id}>
                  <Link to={getPath(item)} className="flex items-center gap-4">
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
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}
