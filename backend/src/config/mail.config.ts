import { registerAs } from "@nestjs/config";

export default registerAs("mail", () => ({
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT || 587),
	login: process.env.MAIL_LOGIN,
	password: process.env.MAIL_PASSWORD,
}))