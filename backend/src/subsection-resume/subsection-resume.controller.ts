import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { SubsectionResumeService } from './subsection-resume.service';
import { SubsectionNameValidationPipe } from './pipes/subsection-name-validation.pipe';
import type { ResumeSubsectionNames } from './types/subsection-names.types';

@Controller("resumes/:resumeId/sections/:sectionId/subsections")
export class SubsectionResumeController {
  constructor(private readonly subsectionResumeService: SubsectionResumeService) {}

  @Post()
  async create(@Param("sectionId") sectionId: string, @Body("subsectionId") subsectionId: string, @Body("subsectionName", SubsectionNameValidationPipe) subsectionName: ResumeSubsectionNames, @Body("dto") dto: any) {
    return this.subsectionResumeService.createOne({ subsectionId, subsectionName, sectionId, updates: dto });
  }

  @Post(":subsectionId")
  async delete(@Param("subsectionId") subsectionId: string, @Body("subsectionName", SubsectionNameValidationPipe) subsectionName: ResumeSubsectionNames) {
    return this.subsectionResumeService.deleteOne({ subsectionName, subsectionId });
  }

  @Get("count")
  async getCount(@Param("sectionId") sectionId: string, @Body("subsectionName", SubsectionNameValidationPipe) subsectionName: ResumeSubsectionNames) {
    return this.subsectionResumeService.getCount({ subsectionName, sectionId });
  }
}
