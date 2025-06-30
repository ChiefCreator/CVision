import { Controller, Post, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { SectionResumeService } from './section-resume.service';
import { SectionNameValidationPipe } from './pipes/section-name-validation.pipe';
import type { ResumeSectionNames } from 'src/resume/types/ResumeSectionNames';

@Controller("resumes/:resumeId/sections")
export class SectionResumeController {
  constructor(private readonly sectionResumeService: SectionResumeService) {}

  @Post("create/:sectionName")
  async create(@Param("resumeId") resumeId: string, @Param("sectionName", SectionNameValidationPipe) sectionName: ResumeSectionNames) {
    return this.sectionResumeService.create(sectionName, resumeId);
  }

  @Post("delete/:sectionId")
  async delete(@Param("sectionId") sectionId: string, @Body("sectionName", SectionNameValidationPipe) sectionName: ResumeSectionNames) {
    return this.sectionResumeService.delete(sectionName, sectionId);
  }
}
