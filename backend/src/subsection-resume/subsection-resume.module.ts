import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from "src/user/user.module";
import { SubsectionResumeController } from './subsection-resume.controller';
import { SubsectionResumeService } from './subsection-resume.service';

@Module({
  imports: [UserModule],
  controllers: [SubsectionResumeController],
  providers: [SubsectionResumeService, PrismaService],
  exports: [SubsectionResumeService],
})
export class SubsectionResumeModule {}
