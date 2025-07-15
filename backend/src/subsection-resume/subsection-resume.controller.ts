import { Controller, Post, Param, Body } from '@nestjs/common';
import { SubsectionResumeService } from './subsection-resume.service';
import { SectionNameValidationPipe } from './pipes/subsection-name-validation.pipe';
import type { ResumeSubsectionNames } from './types/ResumeSubsectionNames';

@Controller("resumes/:resumeId/sections/:sectionId/subsections")
export class SubsectionResumeController {
  constructor(private readonly subsectionResumeService: SubsectionResumeService) {}

  @Post()
  async create(@Param("sectionId") sectionId: string, @Body("subsectionId") subsectionId: string, @Body("subsectionName", SectionNameValidationPipe) subsectionName: ResumeSubsectionNames, @Body("dto") dto: any) {
    return this.subsectionResumeService.createOne({ subsectionId, subsectionName, sectionId, updates: dto });
  }

  @Post(":subsectionId")
  async delete(@Param("subsectionId") subsectionId: string, @Body("subsectionName", SectionNameValidationPipe) subsectionName: ResumeSubsectionNames) {
    return this.subsectionResumeService.deleteOne({ subsectionName, subsectionId });
  }
}
