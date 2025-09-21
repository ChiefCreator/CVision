import { apiClassic } from '@/api/api';
import { LoginFormData } from "@/app/auth/login/components/LoginForm/loginSchema";
import { RegisterFormData } from "@/app/auth/register/components/RegisterForm/registerSchema";
import { MessageResponse } from "@/types/api/response";
import { User } from "@/types/auth/auth";
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

  async connectByProvider(provider: OAuthProvider) {
		const res = await this.api.get<{ url: string }>(`${this.BASE_URL_SEGMENT}/oauth/connect/${provider}`)

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