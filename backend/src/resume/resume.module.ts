import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionResumeService } from 'src/section-resume/section-resume.service';
import { SubsectionResumeService } from 'src/subsection-resume/subsection-resume.service';
import { UserModule } from "src/user/user.module";
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [UserModule],
  controllers: [ResumeController],
  providers: [ResumeService, PrismaService, SectionResumeService, SubsectionResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
