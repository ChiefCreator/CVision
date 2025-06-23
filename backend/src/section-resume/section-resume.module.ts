import { Module } from '@nestjs/common';
import { SectionResumeService } from './section-resume.service';
import { SectionResumeController } from './section-resume.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SectionResumeController],
  providers: [SectionResumeService, PrismaService],
})
export class SectionResumeModule {}
