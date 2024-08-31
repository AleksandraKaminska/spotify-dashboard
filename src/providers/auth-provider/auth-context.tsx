import { createContext } from "react"

export interface AuthContextValue {
  accessToken: string | null
  refreshToken: string | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)
