import { Input, Text } from "@/components/ui"
import { useSearch } from "@/providers/search-provider"
import { Search as SearchIcon } from "lucide-react"

interface Props {
  placeholder: string
}

export const Search = ({ placeholder }: Props) => {
  const {
    isSearchActive,
    setIsSearchActive,
    searchValue,
    onSearchValueChange,
  } = useSearch()

  const handleClick = () => setIsSearchActive(true)

  if (isSearchActive) {
    return (
      <>
        <Input
          type="search"
          placeholder={placeholder}
          autoFocus
          className="rounded-full"
          value={searchValue}
          onChange={(e) => onSearchValueChange(e.target.value)}
        />
      </>
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
