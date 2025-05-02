import { AuthService } from "@/api/services/auth.service"
import { decodeUser } from "@/lib/decode-token"
import { ILogin, IRegister, IUser } from "@/types/auth/types"
import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "sonner"
import { tokenStore } from "./token.store"

class AuthStore {
  user: IUser | null = null
  isLoading = false
  registeredEmail: string | null = null // для хранения email после регистрации

  constructor() {
    makeAutoObservable(this)
  }

  private setLoading(state: boolean) {
    this.isLoading = state
  }

  private handleError(error: any, fallback: string) {
    toast.error(error?.response?.data?.errorMessage || fallback)
  }

  async register(data: IRegister) {
    this.setLoading(true)
    try {
      const { email } = await AuthService.register(data)
      runInAction(() => {
        this.registeredEmail = email
      })
    } finally {
      this.setLoading(false)
    }
  }

  async verifyCode(code: number) {
    if (!this.registeredEmail) {
      toast.error("Неизвестный email. Зарегистрируйтесь заново.")
      return
    }

    this.setLoading(true)
    try {
      const tokens = await AuthService.verifyCode({
        email: this.registeredEmail,
        code,
      })

      tokenStore.setTokens(tokens)

      const user = decodeUser(tokens.accessToken)

      runInAction(() => {
        this.user = user
        toast.success(`Добро пожаловать, ${user.email}`)
      })
    } catch (error) {
      this.handleError(error, "Неверный код подтверждения")
    } finally {
      this.setLoading(false)
    }
  }

  async login(data: ILogin) {
    this.setLoading(true)
    try {
      const tokens = await AuthService.login(data)
      tokenStore.setTokens(tokens)

      const user = decodeUser(tokens.accessToken)
      console.log(user)

      runInAction(() => {
        this.user = user
        toast.success(`Добро пожаловать, ${user.email}`)
      })
    } catch (error) {
      this.handleError(error, "Ошибка при входе")
    } finally {
      this.setLoading(false)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
    } catch (error) {
      this.handleError(error, "Ошибка при выходе")
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
        toast.success(`Профиль загружен`)
      })
    } catch (error) {
      runInAction(() => {
        this.user = null
        tokenStore.clearTokens()
      })
      this.handleError(error, "Ошибка загрузки профиля")
    }
  }

  async sendVerificationCode(email: string) {
    this.setLoading(true)
    try {
      const message = await AuthService.sendVerificationCode({ email })  // Pass email as an object
      toast.success(message) // "Verification code sent."
    } catch (error) {
      console.log(error)
      this.handleError(error, "Ошибка при отправке кода подтверждения")
    } finally {
      this.setLoading(false)
    }
  }
  

  get isAuth() {
    return Boolean(this.user)
  }
}

export const authStore = new AuthStore()
