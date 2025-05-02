import { axiosInstance } from '@/api/axios-instance';
import { IAuthResponse, ILogin, IRegister, IUser } from '@/types/auth/types';
import { AxiosResponse } from 'axios';

export class AuthService {
  private static readonly LOGIN_URL = "/auth/login";
  private static readonly REGISTER_URL = "/auth/register";
  private static readonly LOGOUT_URL = "/auth/logout";
  private static readonly REFRESH_URL = "/auth/refresh-token";
  private static readonly ME_URL = "/users/me"

  static async login(data: ILogin): Promise<IAuthResponse> {
    const response: AxiosResponse<IAuthResponse> = await axiosInstance.post(this.LOGIN_URL, data)
    return response.data
  }

  static async register(data: IRegister): Promise<IAuthResponse> {
    const response: AxiosResponse<IAuthResponse> = await axiosInstance.post(this.REGISTER_URL, data)
    return response.data
  }

  static async logout(): Promise<void> {
    await axiosInstance.post(this.LOGOUT_URL)
  }

  static async refresh(): Promise<IAuthResponse> {
    const response: AxiosResponse<IAuthResponse> = await axiosInstance.get(this.REFRESH_URL)
    return response.data
  }
  
  static async getMe(): Promise<IUser> {
    const res = await axiosInstance.get(this.ME_URL)
    return res.data
  }
}