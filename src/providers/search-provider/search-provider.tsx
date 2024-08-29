import { PropsWithChildren, useEffect, useState } from "react"
import { SearchContext } from "./search-context"
import { useDebouncedSearch } from "@/hooks/use-debounced-search"
import { useSearch as useSearchApi } from "@/hooks/api/search"
import { SearchType } from "@/types"

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { searchValue, onSearchValueChange, query } = useDebouncedSearch()
  const enabled = isSearchActive && !!query && query?.length > 0

  const { data, isPending, isError, error } = useSearchApi(
    {
      q: query,
      type: Object.values(SearchType).join(","),
    },
    {
      enabled,
    }
  )

  /**
   * Added a small artificial delay to the end of the loading state,
   * this is done to prevent the search results from flickering too much.
   */
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    if (isPending && enabled) {
      setIsLoading(true)
    } else {
      timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 150)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isPending, enabled])

  if (isError) {
    throw error
  }

  return (
    <SearchContext.Provider
      value={{
        isLoading,
        isSearchActive,
        setIsSearchActive,
        data,
        searchValue,
        onSearchValueChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
