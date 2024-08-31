import { NoResults } from "@/components/common/empty-content"
import { Tracks } from "@/components/common/tracks"
import { InfoBox, Toaster } from "@/components/ui"
import { Link } from "react-router-dom"
import {
  Artist,
  Paging,
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
                </li>
              ))}
            </ul>
          ) : (
            <Tracks
              tracks={results as Paging<SimplifiedTrack>}
              className="p-8"
            />
          )}
          <Toaster />
        </>
      )}
    </>
  )
}
