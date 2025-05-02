import { IAuthResponse } from "@/types/auth/types"
import { makeAutoObservable } from "mobx"

class TokenStore {
  accessToken: string | null = null
  refreshToken: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setTokens({ accessToken, refreshToken }: IAuthResponse) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }

  clearTokens() {
    this.accessToken = null
    this.refreshToken = null
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
}

export const tokenStore = new TokenStore()
