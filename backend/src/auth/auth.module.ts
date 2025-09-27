import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getProvidersConfig } from "src/config/get-providers.config";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailChangeModule } from "./email-change/email-change.module";
import { EmailConfirmationModule } from "./email-confirmation/email-confirmation.module";
import { ProviderModule } from "./provider/provider.module";

@Module({
  imports: [
		ProviderModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getProvidersConfig,
			inject: [ConfigService]
		}),
		EmailConfirmationModule,
		EmailChangeModule,
		forwardRef(() => UserModule),
	],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService]
})
export class AuthModule {}
