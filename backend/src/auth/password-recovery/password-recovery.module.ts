import { Module } from '@nestjs/common';
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
	imports: [UserModule],
	controllers: [PasswordRecoveryController],
	providers: [PasswordRecoveryService, PrismaService, MailService]
})
export class PasswordRecoveryModule {}
