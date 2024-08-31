import {
  REDIRECT_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_TOKEN_URL,
} from "@/utils/constants"

export async function refreshAccessToken(refreshToken: string) {
  const authHeader = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

  const body = new URLSearchParams()
  body.append("grant_type", "refresh_token")
  body.append("refresh_token", refreshToken)

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `Spotify API error ${response.status}: ${errorData.error_description}`
    )
  }

  return await response.json()
}

export async function getUserAccessToken(code: string) {
  const authHeader = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

  const body = new URLSearchParams()

  body.append("grant_type", "authorization_code")
  body.append("code", code)
  body.append("redirect_uri", REDIRECT_URI)

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

  return await response.json()
}

export async function getAccessToken() {
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
