import { SearchListRes } from "@/types"
import { getRequest } from "../common"

async function listSearch(query?: Record<string, any>) {
  return getRequest<SearchListRes>(`/api/search`, query)
}

export const search = {
  list: listSearch,
}
