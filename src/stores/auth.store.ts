import { AuthService } from "@/api/services/auth.service"
import { ILogin, IRegister, IUser } from "@/types/auth/types"
import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "sonner"
import { tokenStore } from "./token.store"

class AuthStore {
  user: IUser | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  private setLoading(state: boolean) {
    this.isLoading = state
  }

  private handleError(error: any, fallback: string) {
    toast.error(error?.response?.data?.message || fallback)
  }

  async login(data: ILogin) {
    this.setLoading(true)
    try {
      const tokens = await AuthService.login(data)
      tokenStore.setTokens(tokens)

      const user = await AuthService.getMe()
      runInAction(() => {
        this.user = user
        toast.success(`Добро пожаловать, ${user.firstName}`)
      })
    } catch (error) {
      this.handleError(error, "Ошибка при входе")
    } finally {
      runInAction(() => this.setLoading(false))
    }
  }

  async register(data: IRegister) {
    this.setLoading(true)
    try {
      const tokens = await AuthService.register(data)
      tokenStore.setTokens(tokens)

      const user = await AuthService.getMe()
      runInAction(() => {
        this.user = user
        toast.success(`Регистрация успешна. Добро пожаловать, ${user.firstName}`)
      })
    } catch (error) {
      this.handleError(error, "Ошибка при регистрации")
    } finally {
      runInAction(() => this.setLoading(false))
    }
  }

  async logout() {
    try {
      await AuthService.logout()
    } catch (error) {
      this.handleError(error, "Ошибка при выходе из аккаунта")
    } finally {
      runInAction(() => {
        this.user = null
        tokenStore.clearTokens()
        toast.success("Вы вышли из аккаунта")
      })
    }
  }

  async getMe() {
    try {
      const user = await AuthService.getMe()
      runInAction(() => {
        this.user = user
        toast.success(`Профиль загружен: ${user.firstName}`)
      })
    } catch (error) {
      runInAction(() => {
        this.user = null
        tokenStore.clearTokens()
      })
      this.handleError(error, "Не удалось загрузить профиль. Попробуйте войти заново.")
    }
  }

  get isAuth() {
    return Boolean(this.user)
  }
}

export const authStore = new AuthStore()
