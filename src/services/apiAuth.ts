import { request } from './constants'

type LoginProps = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
}

type SignupProps = LoginProps

type SignupResponse = {
  message: string
}

export const loginUser = async (data: LoginProps): Promise<LoginResponse> => {
  return request<LoginResponse>('POST', '/auth/login', data)
}

export const signupUser = async (
  data: SignupProps
): Promise<SignupResponse> => {
  return request<SignupResponse>('POST', '/auth/register', data)
}
