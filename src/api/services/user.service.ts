import { axiosInstance } from '@/api/axios-instance'
import { IUser } from '@/types/auth/types'
import { AxiosResponse } from 'axios'

export class UserService {
  private static readonly BASE_URL = '/users'

  static async getMe(): Promise<IUser> {
    const response: AxiosResponse<IUser> = await axiosInstance.get(`${this.BASE_URL}/me`)
    return response.data
  }

  static async getTgLink(): Promise<string | undefined> {
    try{
      const response: AxiosResponse<string> = await axiosInstance.get(`${this.BASE_URL}/generate-telegram-token`)
      return response.data
    } catch(e: any){
      console.log(e)
      return undefined
    }
  }
}
