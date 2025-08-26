import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getProvidersConfig } from "src/config/get-providers.config";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from "./email-confirmation/email-confirmation.module";
import { ProviderModule } from "./provider/provider.module";

@Module({
  imports: [
		ProviderModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getProvidersConfig,
			inject: [ConfigService]
		}),
		forwardRef(() => EmailConfirmationModule)
	],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
