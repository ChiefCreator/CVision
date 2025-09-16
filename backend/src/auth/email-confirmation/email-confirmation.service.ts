import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from "express";
import { TokenType } from "prisma/generated/client";
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { v4 as uuidv4 } from "uuid";
import { AuthService } from "../auth.service";
import { ConfirmationDto } from "./dto/confirmation.dto";

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {};

	async newVerification(req: Request, dto: ConfirmationDto) {
		const existingToken = await this.prismaService.token.findUnique({
			where: {
				token: dto.token,
				type: TokenType.verification
			}
		})

		if (!existingToken) {
			throw new NotFoundException("Токен подтверждения не найден. Пожалуйста, убедитесь, что у вас правильный токен.");
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date();

		if (hasExpired) {
			throw new BadRequestException("Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения.");
		}

		const existingUser = await this.userService.findByEmail(existingToken.email);

		if (!existingUser) {
			throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенный адрес электронной почты и попробуйте снова.");
		}

		await this.prismaService.user.update({
			where: { id: existingUser.id },
			data: { isVerified: true }
		})

		await this.prismaService.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.verification
			}
		})

		return this.authService.saveSession(req, existingUser);
	}

  async sendVerificationToken(email: string) {
    const verificationToken = await this.generateVerificationToken(email);

		await this.mailService.sendConfirmationEmail(
			verificationToken.email,
			verificationToken.token
		)

		return true;
  }

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: { email, type: TokenType.verification }
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: { id: existingToken.id, type: TokenType.verification },
      })
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        token,
        email,
        expiresIn,
        type: TokenType.verification,
      }
    });

    return verificationToken;
  }
}
