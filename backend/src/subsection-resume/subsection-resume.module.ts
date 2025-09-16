import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResumeModule } from "src/resume/resume.module";
import { ResumeService } from "src/resume/resume.service";
import { SectionResumeModule } from "src/section-resume/section-resume.module";
import { UserModule } from "src/user/user.module";
import { SubsectionResumeController } from './subsection-resume.controller';
import { SubsectionResumeService } from './subsection-resume.service';

@Module({
  imports: [
    UserModule,
    forwardRef(() => SectionResumeModule),
    forwardRef(() => ResumeModule),
  ],
  controllers: [SubsectionResumeController],
  providers: [SubsectionResumeService, PrismaService, ResumeService],
  exports: [SubsectionResumeService],
})
export class SubsectionResumeModule {}
