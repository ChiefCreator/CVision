import { Module } from '@nestjs/common';
import { SectionResumeService } from './section-resume.service';
import { SectionResumeController } from './section-resume.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubsectionResumeService } from 'src/subsection-resume/subsection-resume.service';
import { ResumeService } from 'src/resume/resume.service';

@Module({
  controllers: [SectionResumeController],
  providers: [SectionResumeService, PrismaService, ResumeService, SubsectionResumeService],
})
export class SectionResumeModule {}
