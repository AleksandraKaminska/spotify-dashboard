import { stringify } from "qs"

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

let accessToken: string | null = null

async function getAccessToken() {
  const authHeader = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

  const body = new URLSearchParams()
  body.append("grant_type", "client_credentials")

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body?.toString(),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `Spotify API error ${response.status}: ${errorData.error_description}`
    )
  }

  const data = await response.json()
  return data.access_token
}

const commonHeaders = async (): Promise<HeadersInit> => {
  if (!accessToken) {
    accessToken = await getAccessToken()
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }
}

export function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? stringify(query) : null
  return `${path}${params ? `?${params}` : ""}`
}

function getBody(payload?: Record<string, any>) {
  return payload ? JSON.stringify(payload) : undefined
}

async function getOptions(
  options?: Omit<RequestInit, "body">,
  payload?: Record<string, any>
): Promise<RequestInit> {
  const body = getBody(payload)

  return {
    ...options,
    headers: {
      ...(await commonHeaders()),
      ...options?.headers,
    },
    body,
  }
}

async function makeRequest<
  TRes,
  TPayload extends Record<string, any> | undefined,
  TQuery extends Record<string, any> | undefined = undefined,
>(
  path: string,
  payload?: TPayload,
  query?: TQuery,
  options?: Omit<RequestInit, "body">
): Promise<TRes> {
  const url = getUrl(path, query)
  const requestOptions = await getOptions(options, payload)

  let response = await fetch(url, requestOptions)

  // If the token is expired or unauthorized, refresh the token and retry once
  if (response.status === 401) {
    accessToken = await getAccessToken()
    requestOptions.headers = await commonHeaders()
    response = await fetch(url, requestOptions)
  }

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(`API error ${response.status}: ${errorData.message}`)
  }

  return response.json()
}

export async function getRequest<
  TRes,
  TQuery extends Record<string, any> | undefined = object,
>(
  path: string,
  query?: TQuery,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, undefined, Record<string, any>>(
    path,
    undefined,
    query,
    {
      ...options,
      method: "GET",
    }
  )
}

export async function postRequest<
  TRes,
  TPayload extends Record<string, any> | undefined = object,
>(
  path: string,
  payload?: TPayload,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, Record<string, any>>(path, payload, undefined, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function deleteRequest<TRes>(
  path: string,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, undefined>(path, undefined, undefined, {
    ...options,
    method: "DELETE",
  })
}
