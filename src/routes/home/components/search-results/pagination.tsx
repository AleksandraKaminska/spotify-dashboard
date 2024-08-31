import { Button } from "@/components/ui"
import { useSearch } from "@/hooks/api/search"
import { keepPreviousData } from "@tanstack/react-query"
import { Minus } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { SearchContent } from "spotify-types"

interface PaginationState {
  pageIndex: number
  pageSize: number
  nextPageUrl: string | null
  previousPageUrl: string | null
}

interface Props {
  results: SearchContent[keyof SearchContent]
  setResults: (results: SearchContent[keyof SearchContent]) => void
}

export const Pagination = ({ results, setResults }: Props) => {
  const { t } = useTranslation()

  const [{ pageIndex, pageSize, nextPageUrl, previousPageUrl }, setPagination] =
    useState<PaginationState>({
      pageIndex: results?.offset
        ? Math.floor(results.offset / results.limit!)
        : 0,
      pageSize: results?.limit ?? 0,
      nextPageUrl: results?.next ?? null,
      previousPageUrl: results?.previous ?? null,
    })

  const canNextPage = !!nextPageUrl
  const canPreviousPage = !!previousPageUrl

  const { data: pagedResults, refetch } = useSearch(
    nextPageUrl
      ? {
          q: new URL(nextPageUrl).searchParams.get("query") ?? "",
          type: new URL(nextPageUrl).searchParams.get("type") ?? "",
          offset: new URL(nextPageUrl).searchParams.get("offset") ?? "",
          limit: new URL(nextPageUrl).searchParams.get("limit") ?? "",
        }
      : {},
    {
      placeholderData: keepPreviousData,
      enabled: false, // Initially disable auto-fetch
    }
  )

  const { from, to } = useMemo(() => {
    const from =
      results?.total === 0 ? results?.total : pageIndex * pageSize + 1
    const to = Math.min(results?.total ?? 0, (pageIndex + 1) * pageSize)
    return { from, to }
  }, [results, pageIndex, pageSize])

  // Update results and pagination when new data is fetched
  useEffect(() => {
    if (pagedResults) {
      const pagedResult = Object.values(pagedResults)[0]
      setResults(pagedResult)
      setPagination({
        pageIndex: Math.floor(pagedResult.offset / pagedResult.limit),
        pageSize: pagedResult.limit,
        nextPageUrl: pagedResult.next,
        previousPageUrl: pagedResult.previous,
      })
    }
  }, [pagedResults, setResults])

  const fetchNextPage = () => {
    if (canNextPage) {
      refetch()
    }
  }

  const fetchPreviousPage = () => {
    if (canPreviousPage) {
      refetch()
    }
  }

  return (
    <div className="txt-compact-small-plus flex w-full items-center justify-between px-3 py-4 text-ui-fg-subtle">
      <div className="inline-flex items-center gap-x-1 px-3 py-[5px]">
        <p>{from}</p>
        <Minus className="text-ui-fg-muted" />
        <p>{`${to} ${t("general.of")} ${results?.total} ${t("general.results")}`}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="inline-flex items-center gap-x-1 px-3 py-[5px]">
          <p>
            {pageIndex + 1} {t("general.of")}{" "}
            {Math.ceil((results?.total ?? 0) / pageSize)} {t("general.pages")}
          </p>
        </div>
        <Button
          type="button"
          variant={"transparent"}
          onClick={fetchPreviousPage}
          disabled={!canPreviousPage}
        >
          {t("general.prev")}
        </Button>
        <Button
          type="button"
          variant={"transparent"}
          onClick={fetchNextPage}
          disabled={!canNextPage}
        >
          {t("general.next")}
        </Button>
      </div>
    </div>
  )
}
