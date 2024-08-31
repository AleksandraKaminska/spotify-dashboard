import { PropsWithChildren, useEffect, useState } from "react"
import { AuthContext } from "./auth-context"
import { useSearchParams } from "react-router-dom"
import {
  ACCESS_TOKEN_KEY,
  CODE_KEY,
  REDIRECT_URI,
  REFRESH_TOKEN_KEY,
  SPOTIFY_AUTHORIZE_URL,
  SPOTIFY_CLIENT_ID,
} from "@/utils/constants"
import {
  getUserAccessToken,
  refreshAccessToken,
} from "@/lib/client/access-token"
import { setCookie, getCookie, removeCookie } from "@/utils/cookies" // Import cookie utilities

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [accessToken, setAccessToken] = useState<string | null>(
    getCookie(ACCESS_TOKEN_KEY) ?? null
  )
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getCookie(REFRESH_TOKEN_KEY) ?? null
  )
  const code = searchParams.get(CODE_KEY)

  function getAuthorizeUrl() {
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: CODE_KEY,
      redirect_uri: REDIRECT_URI,
      scope:
        "user-library-read user-library-modify user-follow-read user-follow-modify playlist-modify-public playlist-modify-private",
    })

    return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`
  }

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!accessToken && !code) {
        window.location.replace(getAuthorizeUrl())
      } else if (code) {
        try {
          const now = new Date()
          // Calculate the expiration date (1 hour from now - 5 minutes)
          const expiresIn = new Date(now.getTime() + 60 * 55 * 1000)

          const data = await getUserAccessToken(code)
          setCookie(ACCESS_TOKEN_KEY, data.access_token, { expires: expiresIn })
          setCookie(REFRESH_TOKEN_KEY, data.refresh_token, {
            expires: expiresIn,
          })
          setAccessToken(data.access_token)
          setRefreshToken(data.refresh_token)
          searchParams.delete(CODE_KEY)
          setSearchParams(searchParams)
        } catch (error) {
          console.error("Failed to fetch access token", error)
        }
      } else if (refreshToken) {
        try {
          const now = new Date()
          // Calculate the expiration date (1 hour from now - 5 minutes)
          const expiresIn = new Date(now.getTime() + 60 * 55 * 1000)
          const data = await refreshAccessToken(refreshToken)
          setCookie(ACCESS_TOKEN_KEY, data.access_token, { expires: expiresIn })
          setAccessToken(data.access_token)
        } catch (error) {
          console.error("Failed to refresh access token", error)
          removeCookie(ACCESS_TOKEN_KEY)
          removeCookie(REFRESH_TOKEN_KEY)
          setAccessToken(null)
          setRefreshToken(null)
        }
      }
    }

    fetchAccessToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
