import { AuthService } from "@/api/services/auth.service"
import { decodeUser } from "@/lib/decode-token"
import { ILogin, IRegister, IUser } from "@/types/auth.types"
import { toast } from "sonner"
import { create } from "zustand"
import { useTokenStore } from "./token.store"

interface AuthState {
  user: IUser | null
  isLoading: boolean
  registeredEmail: string | null
  isAuth: boolean
  register: (data: IRegister) => Promise<void>
  verifyCode: (code: number) => Promise<void>
  login: (data: ILogin) => Promise<void>
  logout: () => Promise<void>
  getMe: () => Promise<void>
  sendVerificationCode: (email: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  registeredEmail: null,

  get isAuth() {
    return Boolean(get().user)
  },

  async register(data) {
    set({ isLoading: true })
    try {
      const { email } = await AuthService.register(data)
      set({ registeredEmail: email })
    } catch (e) {
      console.log(e)
    } finally {
      set({ isLoading: false })
    }
  },

  async verifyCode(code) {
    const { registeredEmail } = get()
    const { setTokens } = useTokenStore.getState()

    if (!registeredEmail) {
      toast.error("Неизвестный email. Зарегистрируйтесь заново.")
      return
    }

    set({ isLoading: true })
    try {
      const tokens = await AuthService.verifyCode({ email: registeredEmail, code })
      setTokens(tokens)

      const user = decodeUser(tokens.accessToken)
      set({ user })
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: user.role }))
      console.log(user)
      toast.success(`Добро пожаловать, ${user.email}`)
    } catch (error: any) {
      toast.error(error?.response?.data?.errorMessage || "Неверный код подтверждения")
    } finally {
      set({ isLoading: false })
    }
  },

  async login(data) {
    set({ isLoading: true })
    try {
      const tokens = await AuthService.login(data)
      useTokenStore.getState().setTokens(tokens)

      const user = decodeUser(tokens.accessToken)
      set({ user })
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: user.role }))
      toast.success(`Добро пожаловать, ${user.email}`)
    } catch (error: any) {
      toast.error(error?.response?.data?.errorMessage || "Ошибка при входе")
    } finally {
      set({ isLoading: false })
    }
  },

  async logout() {
    try {
      await AuthService.logout()
    } finally {
      useTokenStore.getState().clearTokens()
      set({ user: null })
      toast.success("Вы вышли из аккаунта")
    }
  },

  async getMe() {
    try {
      const user = await AuthService.getMe()
      set({ user })
      toast.success("Профиль загружен")
    } catch (error: any) {
      useTokenStore.getState().clearTokens()
      set({ user: null })
      toast.error(error?.response?.data?.errorMessage || "Ошибка загрузки профиля")
    }
  },

  async sendVerificationCode(email) {
    set({ isLoading: true })
    try {
      const message = await AuthService.sendVerificationCode({ email })
      toast.success(message)
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.errorMessage || "Ошибка при отправке кода подтверждения")
    } finally {
      set({ isLoading: false })
    }
  },
}))
