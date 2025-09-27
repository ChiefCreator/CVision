import { forwardRef, Module } from '@nestjs/common';
import { MailModule } from "src/mail/mail.module";
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "../auth.module";
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
  imports: [MailModule, forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, PrismaService, MailService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
