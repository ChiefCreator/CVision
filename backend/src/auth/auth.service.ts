import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

import { Request, Response } from "express";
import { AuthMethod, User } from "prisma/generated/client";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import { ProviderService } from "./provider/provider.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
  ) {};

  async register(req: Request, dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException("Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.");
    }

    const newUser = await this.userService.create({ ...dto, picture: "", authMethod: "credentials", isVerified: false });

    await this.saveSession(req, newUser);

    return newUser;
  }

  async login(req: Request, { email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.password) {
      throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенные данные.")
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException("Неверный пароль. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли.")
    }

    await this.saveSession(req, user);

    return user; 
  }

  async extractProfileFromCode(req: Request, provider: string, code: string) {
		const providerInstance = this.providerService.findByService(provider);

    if (!providerInstance) {
      throw new BadRequestException(`${provider} не существует`);
    }

		const profile = await providerInstance.findUserByCode(code);

		const account = await this.prismaService.account.findFirst({
			where: {
				id: profile.id,
				provider: profile.provider
			}
		});

		let user = account?.userId ? await this.userService.findById(account.userId) : null;

		if (user) {
			return this.saveSession(req, user);
		}

		user = await this.userService.create({
      email: profile.email,
			password: '',
			name: profile.name,
			picture: profile.picture,
			authMethod: profile.provider as AuthMethod,
			isVerified: true
    });

		if (!account) {
			await this.prismaService.account.create({
				data: {
					userId: user.id,
					type: "oauth",
					provider: profile.provider,
					accessToken: profile.access_token,
					refreshToken: profile.refresh_token,
					expiresAt: profile.expires_at
				}
			})
		}

		return this.saveSession(req, user)
	}

  async logout(req: Request, res: Response) {
    return this.deleteSession(req, res);
  }

  async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save(err => {
        if (err) {
          return reject(new InternalServerErrorException("Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии."));
        }

        resolve({ user });
      })
    })
  }

  async deleteSession(req: Request, res: Response) {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          return reject(new InternalServerErrorException("Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена."))
        }

        res.clearCookie(this.configService.getOrThrow<string>("session.name"));

        resolve({});
      })
    })
  }
}