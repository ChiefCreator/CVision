import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionResumeModule } from "src/section-resume/section-resume.module";
import { SectionResumeService } from 'src/section-resume/section-resume.service';
import { SubsectionResumeModule } from "src/subsection-resume/subsection-resume.module";
import { UserModule } from "src/user/user.module";
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    UserModule,
    forwardRef(() => SectionResumeModule),
    forwardRef(() => SubsectionResumeModule),
  ],
  controllers: [ResumeController],
  providers: [ResumeService, PrismaService, SectionResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
