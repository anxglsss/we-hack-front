import { IDecodedJWT, IUser } from '@/types/auth.types'
import { jwtDecode } from 'jwt-decode'

export function decodeUser(token: string): IUser {
  const decoded = jwtDecode<IDecodedJWT>(token)
  return {
    email: decoded.sub,
    role: decoded.roles[0] || "USER",
  }
}