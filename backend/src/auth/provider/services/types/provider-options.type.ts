export interface BaseProviderOptions {
	name: string;
	authorize_url: string;
	access_url: string;
	profile_url: string;
	scopes: string[];
	client_id: string;
	client_secret: string;
}

export type ProviderOptions = Pick<BaseProviderOptions, "scopes" | "client_id" | "client_secret">;