import { Controller, Post, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { SectionResumeService } from './section-resume.service';
import { CreateSectionNameValidationPipe } from './pipes/create-section-name-validation.pipe';
import type { CreateSections } from './types/create-sections';

@Controller("resumes/:resumeId/sections")
export class SectionResumeController {
  constructor(private readonly sectionResumeService: SectionResumeService) {}

  @Post("create/:sectionName")
  async create(@Param("resumeId") resumeId: string, @Param("sectionName", CreateSectionNameValidationPipe) sectionName: CreateSections) {
    return this.sectionResumeService.create(sectionName, resumeId);
  }

  @Post("delete/:sectionId")
  async delete(@Param("sectionId") sectionId: string, @Body("sectionName", CreateSectionNameValidationPipe) sectionName: CreateSections) {
    return this.sectionResumeService.delete(sectionName, sectionId);
  }
}
