import { IAuthResponse } from '@/types/auth.types'
import { create } from 'zustand'

interface TokenState {
  accessToken: string | null
  refreshToken: string | null
  setTokens: (tokens: IAuthResponse) => void
  clearTokens: () => void
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,

  setTokens: ({ accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    set({ accessToken, refreshToken })
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({ accessToken: null, refreshToken: null })
  },
}))
