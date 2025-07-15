import { Module } from '@nestjs/common';
import { SubsectionResumeService } from './subsection-resume.service';
import { SubsectionResumeController } from './subsection-resume.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SubsectionResumeController],
  providers: [SubsectionResumeService, PrismaService],
  exports: [SubsectionResumeService],
})
export class SubsectionResumeModule {}
