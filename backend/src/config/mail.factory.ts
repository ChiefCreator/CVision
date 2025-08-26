import { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { isDev } from "src/utils/env.utils";


export const getMailerConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: configService.getOrThrow<string>("mail.host"),
    port: configService.getOrThrow<number>("mail.port"),
		secure: !isDev(),
    auth: {
      user: configService.getOrThrow<string>("mail.login"),
      pass: configService.getOrThrow<string>("mail.password"),
    },
  },
	defaults: {
		from: `CVision Team ${configService.getOrThrow<string>("mail.login")}`
	}
})