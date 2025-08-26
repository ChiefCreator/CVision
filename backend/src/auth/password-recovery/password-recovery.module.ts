import { Module } from '@nestjs/common';
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
	controllers: [PasswordRecoveryController],
	providers: [PasswordRecoveryService, PrismaService, UserService, MailService]
})
export class PasswordRecoveryModule {}
