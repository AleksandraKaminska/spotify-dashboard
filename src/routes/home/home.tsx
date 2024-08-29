import { Search } from "@/components/search"
import { Container } from "@/components/ui"
import { useSearch } from "@/providers/search-provider"
import { useTranslation } from "react-i18next"
import { SearchResultList } from "./components/search-results"

export const Home = () => {
  const { t } = useTranslation()
  const { isSearchActive } = useSearch()

  return (
    <Container className="flex h-full flex-col items-center justify-center gap-8 px-6 py-4">
      {!isSearchActive && (
        <>
          <img src="/logo.webp" width={260} height={101} alt="Pergam.in logo" />
        </>
      )}
      <Search placeholder={t("general.search")} />
      <SearchResultList />
    </Container>
  )
}
