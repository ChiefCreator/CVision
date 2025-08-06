import { forwardRef, Module } from '@nestjs/common';
import { SubsectionResumeService } from './subsection-resume.service';
import { SubsectionResumeController } from './subsection-resume.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResumeService } from 'src/resume/resume.service';
import { SectionResumeModule } from 'src/section-resume/section-resume.module';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [
    forwardRef(() => SectionResumeModule),
    forwardRef(() => ResumeModule),
  ],
  controllers: [SubsectionResumeController],
  providers: [SubsectionResumeService, PrismaService, ResumeService],
  exports: [SubsectionResumeService],
})
export class SubsectionResumeModule {}
