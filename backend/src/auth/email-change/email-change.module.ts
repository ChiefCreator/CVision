import { forwardRef, Module } from '@nestjs/common';
import { MailModule } from "src/mail/mail.module";
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthModule } from "../auth.module";
import { EmailChangeController } from './email-change.controller';
import { EmailChangeService } from './email-change.service';

@Module({
  imports: [MailModule, forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [EmailChangeController],
  providers: [EmailChangeService, PrismaService, MailService, UserService],
  exports: [EmailChangeService]
})
export class EmailChangeModule {}
