import Cookies from 'js-cookie'

import { apiClassic } from '@/api/api'
import { EnumTokens } from "@/types/auth/token"
import type { Auth } from '@/types/auth/auth'

class AuthTokenService {
  constructor() {}

  getAccessToken = () => {
  	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

  	return accessToken || null;
  }
  saveAccessToken = (accessToken: string) => {
  	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
  		domain: process.env.NEXT_PUBLIC_DOMAIN,
  		sameSite: "strict",
  		expires: 1
  	})
  }
  removeAccessToken = () => {
  	Cookies.remove(EnumTokens.ACCESS_TOKEN)
  }

  async generateNewTokens() {
  	const response = await apiClassic.post<Auth>("/auth/login/access-token");

  	if (response.data.accessToken) this.saveAccessToken(response.data.accessToken);

  	return response;
  }
}

export const authTokenService = new AuthTokenService()