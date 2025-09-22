import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { User as UserType } from "prisma/generated/client";
import { UserService } from "src/user/user.service";
import { Authorization } from "./decorators/authentication.decorator";
import { User } from "./decorators/user.decorator";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthProviderGuard } from "./guards/provider.guard";
import { ProviderService } from "./provider/provider.service";
import { ConnectMode } from "./types/connect-mode.types";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly providerService: ProviderService,
		private readonly userService: UserService,
	) {}

	@Post("register")
	@HttpCode(HttpStatus.OK)
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	async login(@Req() req: Request, @Body() dto: LoginDto) {
		return this.authService.login(req, dto);
	}

	@UseGuards(AuthProviderGuard)
	@Get("oauth/callback/:provider")
	async callback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@Query("code") code: string,
		@Query("state") state: ConnectMode,
		@Param("provider") provider: string,
	) {
		if (!code) {
			throw new BadRequestException("Не был предоставлен код авторизации.");
		}

		if (state === "connect") {
			const user = await this.userService.findById(req.session.userId ?? "");

			await this.authService.connectAccount(user, provider, code);

			return `${res.redirect(this.configService.getOrThrow<string>("app.clientUrl"))}/settings/account`;
		}

		await this.authService.extractProfileFromCode(req, provider, code);

		return res.redirect(this.configService.getOrThrow<string>("app.clientUrl"));
	}

	@UseGuards(AuthProviderGuard)
	@Get("oauth/connect/:provider")
	async connect(@Param("provider") provider: string, @Query("mode") mode: ConnectMode = "login") {
		const providerInstance = this.providerService.findByService(provider);

		if (!providerInstance) {
      throw new BadRequestException(`${provider} не существует`);
    }

		return { url: providerInstance.getAuthUrl(mode) };
	}

	@Authorization()
	@Delete("oauth/disconnect/:provider")
  async disconnect(@Param("provider") provider: string, @User() user: UserType) {
    return this.authService.disconnect(user, provider);
  }

	@Authorization()
	@Post("logout")
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res);
	}
}
