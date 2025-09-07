export interface UserInfo {
	id: string;
	picture: string;
	name: string;
	email: string;
	accessToken?: string;
	refreshToken?: string;
  expiresAt?: number;
	provider: string;
}