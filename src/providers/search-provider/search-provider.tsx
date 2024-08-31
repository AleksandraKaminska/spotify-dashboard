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

  const { data, isError, error } = useSearchApi(
    {
      q: query,
      type: Object.values(SearchType).join(","),
    },
    {
      enabled,
    }
  )

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
