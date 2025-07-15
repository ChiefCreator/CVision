import { Module } from '@nestjs/common';
import { ResumeModule } from './resume/resume.module';
import { SectionResumeModule } from './section-resume/section-resume.module';
import { SubsectionResumeModule } from './subsection-resume/subsection-resume.module';

@Module({
  imports: [ResumeModule, SectionResumeModule, SubsectionResumeModule],
})
export class AppModule {}

