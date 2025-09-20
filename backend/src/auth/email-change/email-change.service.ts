import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from "express";
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { v4 as uuidv4 } from "uuid";
import { AuthService } from "../auth.service";
import { ChangeEmailDto } from "./dto/change-email.dto";

@Injectable()
export class EmailChangeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
		@Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {};

	async newEmail(req: Request, dto: ChangeEmailDto) {
		const existingToken = await this.prismaService.emailChangeToken.findUnique({
			where: { token: dto.token }
		})

		if (!existingToken) {
			throw new NotFoundException("Токен подтверждения не найден. Пожалуйста, убедитесь, что у вас правильный токен.");
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date();

		if (hasExpired) {
			throw new BadRequestException("Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения.");
		}

		const existingUser = await this.userService.findByEmail(existingToken.currentEmail);

		if (!existingUser) {
			throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенный адрес электронной почты и попробуйте снова.");
		}

		const isNewEmailBusy = await this.userService.findByEmail(existingToken.newEmail);

		if (isNewEmailBusy) {
			throw new NotFoundException("Пользователь с таким email уже существует. Пожалуйста, проверьте введенный адрес электронной почты и попробуйте снова.");
		}

		await this.prismaService.user.update({
			where: { id: existingUser.id },
			data: { email: existingToken.newEmail, isVerified: true }
		})

		await this.prismaService.emailChangeToken.delete({
			where: { id: existingToken.id }
		})

		return this.authService.saveSession(req, existingUser);
	}

  async sendEmailChangeToken(currentEmail: string, newEmail: string) {
    const emailChangeToken = await this.generateEmailChangeToken(currentEmail, newEmail);

		await this.mailService.sendChangeEmail(
			emailChangeToken.newEmail,
			emailChangeToken.token
		)

		return true;
  }

  private async generateEmailChangeToken(currentEmail: string, newEmail: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.emailChangeToken.findFirst({
      where: { currentEmail, newEmail }
    });

    if (existingToken) {
      await this.prismaService.emailChangeToken.delete({
        where: { id: existingToken.id },
      })
    }

    const emailChangeToken = await this.prismaService.emailChangeToken.create({
      data: {
        token,
        currentEmail,
				newEmail,
        expiresIn,
      }
    });

    return emailChangeToken;
  }
}
