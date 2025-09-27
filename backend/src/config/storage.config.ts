import { registerAs } from '@nestjs/config';

export default registerAs("storage", () => ({
	driver: process.env.STORAGE_DRIVER || "s3",
	yandex: {
		bucket: process.env.YANDEX_BUCKET,
		region: process.env.YANDEX_REGION ?? "ru-central1",
		accessKey: process.env.YANDEX_ACCESS_KEY,
		secretKey: process.env.YANDEX_SECRET_KEY,
		endpoint: process.env.YANDEX_ENDPOINT,
	}
}));
