import { apiClassic } from '@/api/api';
import { LoginFormData } from "@/app/auth/login/components/LoginForm/loginSchema";
import { RegisterFormData } from "@/app/auth/register/components/RegisterForm/registerSchema";
import { MessageResponse } from "@/types/api/response";
import { User } from "@/types/auth/auth";
import { ConnectMode } from "@/types/auth/connectMode";
import { OAuthProvider } from "@/types/auth/oauthProviders";


class AuthService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/auth";
  private readonly api = apiClassic;

  async register(body: RegisterFormData) {
    const res = await this.api.post<MessageResponse>(`${this.BASE_URL_SEGMENT}/register`, body);

    return res.data;
  }

  async login(body: LoginFormData) {
    const res = await this.api.post<User>(`${this.BASE_URL_SEGMENT}/login`, body);

    return res.data;
  }

  async connectByProvider(provider: OAuthProvider, mode: ConnectMode = "login") {
		const res = await this.api.get<{ url: string }>(`${this.BASE_URL_SEGMENT}/oauth/connect/${provider}?mode=${mode}`)

		return res.data;
	}

  async disconnectProvider(provider: OAuthProvider) {
		const res = await this.api.delete<{ message: string }>(`${this.BASE_URL_SEGMENT}/oauth/disconnect/${provider}`)

		return res.data;
	}

  async logout() {
    const res = await this.api.post<User>(`${this.BASE_URL_SEGMENT}/logout`);

    return res.data;
  }

  async changeEmail(token: string | null) {
    const res = await this.api.post<User>(`${this.BASE_URL_SEGMENT}/email-change`, { token });

    return res.data;
  }
}

export const authService = new AuthService()