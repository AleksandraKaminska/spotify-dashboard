import { SearchListRes } from "@/types"
import { createContext } from "react"

export interface SearchContextValue {
  isLoading: boolean
  isSearchActive: boolean
  setIsSearchActive: (active: boolean) => void
  data: SearchListRes | undefined
  searchValue: string
  onSearchValueChange: (value: string) => void
}

export const SearchContext = createContext<SearchContextValue | null>(null)
