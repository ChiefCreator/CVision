import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResumeModule } from "src/resume/resume.module";
import { ResumeService } from 'src/resume/resume.service';
import { SubsectionResumeService } from 'src/subsection-resume/subsection-resume.service';
import { UserModule } from "src/user/user.module";
import { SectionResumeController } from './section-resume.controller';
import { SectionResumeService } from './section-resume.service';

@Module({
  imports: [
    UserModule,
    forwardRef(() => ResumeModule)
  ],
  controllers: [SectionResumeController],
  providers: [SectionResumeService, PrismaService, ResumeService, SubsectionResumeService],
  exports: [SectionResumeService]
})
export class SectionResumeModule {}
