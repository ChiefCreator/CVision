import { Controller, Post, Param, Body } from '@nestjs/common';
import { SectionResumeService } from './section-resume.service';
import { SectionNameValidationPipe } from './pipes/section-name-validation.pipe';
import type { ResumeSectionNames } from 'src/section-resume/types/section-names.types';

@Controller("resumes/:resumeId/sections")
export class SectionResumeController {
  constructor(private readonly sectionResumeService: SectionResumeService) {}

  @Post()
  async createOne(@Param("resumeId") resumeId: string, @Body("sectionName", SectionNameValidationPipe) sectionName: ResumeSectionNames, @Body("sectionId") sectionId?: string, @Body("dto") dto?: any) {
    return this.sectionResumeService.createOne({ resumeId, sectionName, sectionId, updates: dto });
  }
  @Post("default-ones")
  async createDefaultOnes(@Param("resumeId") resumeId: string) {
    return this.sectionResumeService.createDefaultOnes({ resumeId });
  }

  @Post(":sectionId")
  async deleteOne(@Param("sectionId") sectionId: string, @Body("sectionName", SectionNameValidationPipe) sectionName: ResumeSectionNames) {
    return this.sectionResumeService.deleteOne({ sectionName, sectionId });
  }
}
