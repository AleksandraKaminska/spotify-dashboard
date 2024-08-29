import { Search } from "@/components/search"
import { Container } from "@/components/ui"
import { useArtist } from "@/hooks/api/artists"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const Home = () => {
  const { t } = useTranslation()
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false)

  const { data } = useArtist("0TnOYISbd1XYRBk9myaseg")

  console.log(data)

  return (
    <Container className="h-full divide-y p-0">
      <div className="flex h-full flex-col items-center justify-center gap-16 px-6 py-4">
        {!isSearchActive && (
          <>
            <img
              src="/logo.webp"
              width={260}
              height={101}
              alt="Pergam.in logo"
            />
          </>
        )}
        <Search
          placeholder={t("general.search")}
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
        />
        {isSearchActive && <p>Search content</p>}
      </div>
    </Container>
  )
}
