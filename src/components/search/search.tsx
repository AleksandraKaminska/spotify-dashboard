import { Input, Text } from "@/components/ui"
import { useDebouncedSearch } from "@/hooks/use-debounced-search"
import { Search as SearchIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface Props {
  placeholder: string
  isSearchActive: boolean
  setIsSearchActive: Dispatch<SetStateAction<boolean>>
}

export const Search = ({
  placeholder,
  isSearchActive,
  setIsSearchActive,
}: Props) => {
  const handleClick = () => setIsSearchActive(true)
  const { searchValue, onSearchValueChange, query } = useDebouncedSearch()

  console.log(query)

  if (isSearchActive) {
    return (
      <Input
        type="search"
        placeholder={placeholder}
        autoFocus
        className="rounded-full"
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
      />
    )
  }

  return (
    <div className="w-full max-w-[200px]">
      <button
        className="flex w-full cursor-pointer select-none items-center gap-x-2 rounded-full bg-ui-bg-subtle py-1.5 pl-2 pr-1.5 text-ui-fg-muted shadow-borders-base outline-none transition-fg hover:bg-ui-bg-subtle-hover focus-visible:shadow-borders-focus"
        onClick={handleClick}
      >
        <SearchIcon size={16} />
        <div className="flex-1 text-left">
          <Text size="small" leading="compact">
            {placeholder}
          </Text>
        </div>
      </button>
    </div>
  )
}
