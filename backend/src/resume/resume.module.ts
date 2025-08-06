import { forwardRef, Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { SectionResumeService } from 'src/section-resume/section-resume.service';
import { ResumeController } from './resume.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionResumeModule } from 'src/section-resume/section-resume.module';
import { SubsectionResumeModule } from 'src/subsection-resume/subsection-resume.module';

@Module({
  imports: [
    forwardRef(() => SectionResumeModule),
    forwardRef(() => SubsectionResumeModule),
  ],
  controllers: [ResumeController],
  providers: [ResumeService, PrismaService, SectionResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
