export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: string
}
