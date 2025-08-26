import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from "./auth/auth.module";
import { DocumentModule } from './document/document.module';
import { ResumeModule } from './resume/resume.module';
import { SectionResumeModule } from './section-resume/section-resume.module';
import { SubsectionResumeModule } from './subsection-resume/subsection-resume.module';
import { UserModule } from './user/user.module';

import appConfig from './config/app.config';
import cookieConfig from './config/cookie.config';
import databaseConfig from './config/database.config';
import providerConfig from "./config/provider.config";
import redisConfig from './config/redis.config';
import sessionConfig from './config/session.config';

import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';
import mailConfig from "./config/mail.config";
import { MailModule } from './mail/mail.module';
import { isProd } from './utils/env.utils';

@Module({
  imports: [
    ResumeModule,
    SectionResumeModule,
    SubsectionResumeModule,
    DocumentModule,
    UserModule,
    AuthModule,
    MailModule,
    EmailConfirmationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: isProd(),
      envFilePath: ".env",
      cache: true,
      load: [appConfig, databaseConfig, cookieConfig, sessionConfig, redisConfig, providerConfig, mailConfig]
    }),
  ],
})
export class AppModule {}

