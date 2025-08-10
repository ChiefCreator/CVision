import { Module } from '@nestjs/common';

import { ResumeModule } from './resume/resume.module';
import { SectionResumeModule } from './section-resume/section-resume.module';
import { SubsectionResumeModule } from './subsection-resume/subsection-resume.module';
import { DocumentModule } from './document/document.module';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import cookieConfig from './config/cookie.config';
import sessionConfig from './config/session.config';
import redisConfig from './config/redis.config';

import { isProd } from './utils/env.utils';

@Module({
  imports: [
    ResumeModule,
    SectionResumeModule,
    SubsectionResumeModule,
    DocumentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: isProd(),
      envFilePath: ".env",
      cache: true,
      load: [appConfig, databaseConfig, cookieConfig, sessionConfig, redisConfig]
    })
  ],
})
export class AppModule {}

