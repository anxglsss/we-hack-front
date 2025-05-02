export interface IUser {
  email: string
  role: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  firstName: string
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

export interface IDecodedJWT {
  sub: string
  roles: string[]
  iat: number
  exp: number
}

export interface IVerifyCode {
  email: string
  code: number
}
