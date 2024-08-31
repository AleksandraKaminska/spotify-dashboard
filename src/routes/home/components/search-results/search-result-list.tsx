import { Tabs } from "@/components/ui"
import { useSearch } from "@/providers/search-provider"
import { useEffect, useState } from "react"
import { SearchContent } from "spotify-types"
import { SearchResult } from "./search-result"

export const SearchResultList = () => {
  const { isSearchActive, data } = useSearch()
  const [tab, setTab] = useState<string>()

  useEffect(() => {
    if (data) {
      setTab(Object.keys(data)[0])
    }
  }, [data])

  if (!isSearchActive || !data) return null

  return (
    <Tabs
      className="relative flex h-full w-screen max-w-7xl flex-col gap-8 overflow-auto"
      onValueChange={setTab}
      value={tab}
    >
      <Tabs.List className="sticky top-0 z-10 bg-ui-bg-base py-3 shadow-elevation-card-rest">
        {Object.keys(data).map((type) => (
          <Tabs.Trigger value={type} key={type} className="capitalize">
            {type}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {Object.entries(data).map(
        ([type, results]: [string, SearchContent[keyof SearchContent]]) => (
          <Tabs.Content value={type} key={type} className="p-2">
            <SearchResult results={results} />
          </Tabs.Content>
        )
      )}
    </Tabs>
  )
}
