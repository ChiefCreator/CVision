import { BadRequestException, Injectable } from "@nestjs/common";

import { BaseProviderOptions } from "./types/provider-options.type";
import { UserInfo } from "./types/user-info.types";

@Injectable()
export class BaseOAuthService {
  private BASE_URL: string;

	constructor(private readonly options: BaseProviderOptions) {};

	protected async extractUserInfo(data: any): Promise<UserInfo> {
		return {
			...data,
			provider: this.options.name,
		};
	}

	getAuthUrl(state: string) {
		const query = new URLSearchParams({
			response_type: "code",
			client_id: this.options.client_id,
			redirect_uri: this.getRedirectUri(),
			scope: (this.options.scopes ?? []).join(" "),
			access_type: "offline",
			prompt: "select_account",
			state,
		});

		return `${this.options.authorize_url}?${query}`;
	}

	getRedirectUri() {
		return `${this.BASE_URL}/api/auth/oauth/callback/${this.options.name}`;
	}

	async findUserByCode(code: string) {
		const client_id = this.options.client_id;
		const client_secret = this.options.client_secret;

		const tokenQuery = new URLSearchParams({
			client_id,
			client_secret,
			code,
			redirect_uri: this.getRedirectUri(),
			grant_type: "authorization_code",
		});

		const tokenRequest = await fetch(this.options.access_url, {
			method: 'POST',
			body: tokenQuery,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json"
			}
		});

		if (!tokenRequest.ok) {
			throw new BadRequestException(`Не удалось получить пользователя ${this.options.profile_url}. Проверьте правильность токена доступа.`);
		}

		const tokenResponse = await tokenRequest.json();

		if (!tokenResponse.access_token) {
			throw new BadRequestException(`Нет токенов с ${this.options.access_url}. Убедитесь, что код авторизации действителен.`)
		}

		const userRequest = await fetch(this.options.profile_url, {
			headers: {
				Authorization: `Bearer ${tokenResponse.access_token}`
			}
		});

		if (!userRequest.ok) {
			throw new BadRequestException(`Не удалось получить пользователя ${this.options.profile_url}. Проверьте правильность токена доступа.`);
		}

		const user = await userRequest.json();
		const userInfo = await this.extractUserInfo(user);

		return {
			...userInfo,
			access_token: tokenResponse.access_token,
			refresh_token: tokenResponse.refresh_token,
			expires_at: tokenResponse.expires_at || tokenResponse.expires_in,
			provider: this.options.name,
		}
	}

	set base_url(value: string) {
		this.BASE_URL = value;
	}

	get name() {
		return this.options.name;
	}

	get access_url() {
		return this.options.access_url;
	}

	get profile_url() {
		return this.options.profile_url;
	}

	get scopes() {
		return this.options.scopes;
	}
}