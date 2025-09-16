import { ConfigService } from "@nestjs/config";

import { ModuleSyncOptions } from "src/auth/provider/provider.types";
import { GoogleProvider } from "src/auth/provider/services/google.provider";
import { YandexProvider } from "src/auth/provider/services/yandex.provider";

export const getProvidersConfig = async (configService: ConfigService): Promise<ModuleSyncOptions> => {
	const providerConfig = configService.get("provider");

	return {
		baseUrl: configService.getOrThrow<string>("app.backendUrl"),
		services: [
			new GoogleProvider({
				client_id: providerConfig.google.clientId,
				client_secret: providerConfig.google.clientSecret,
				scopes: ["email", "profile"],
			}),
			new YandexProvider({
				client_id: providerConfig.yandex.clientId,
				client_secret: providerConfig.yandex.clientSecret,
				scopes: ["login:email", "login:avatar", "login:info"],
			}),
		],
	};
};
