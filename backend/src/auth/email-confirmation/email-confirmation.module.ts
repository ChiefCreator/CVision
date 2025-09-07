import { forwardRef, Module } from '@nestjs/common';
import { MailModule } from "src/mail/mail.module";
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthModule } from "../auth.module";
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
  imports: [MailModule, forwardRef(() => AuthModule)],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, PrismaService, MailService, UserService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
