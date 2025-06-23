import { Module } from '@nestjs/common';
import { ResumeModule } from './resume/resume.module';
import { SectionResumeModule } from './section-resume/section-resume.module';

@Module({
  imports: [ResumeModule, SectionResumeModule],
})
export class AppModule {}
