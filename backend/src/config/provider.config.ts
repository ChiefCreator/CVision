import { registerAs } from '@nestjs/config';

export default registerAs("provider", () => ({
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	},
	yandex: {
		clientId: process.env.YANDEX_CLIENT_ID,
		clientSecret: process.env.YANDEX_CLIENT_SECRET,
	}
}));
