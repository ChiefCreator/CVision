import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { SectionResumeService } from 'src/section-resume/section-resume.service';
import { ResumeController } from './resume.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, PrismaService, SectionResumeService],
})
export class ResumeModule {}
