import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Authorization } from "src/auth/decorators/authentication.decorator";
import { SubsectionNameValidationPipe } from './pipes/subsection-name-validation.pipe';
import { SubsectionResumeService } from './subsection-resume.service';
import type { ResumeSubsectionNames } from './types/subsection-names.types';

@Authorization()
@Controller("resumes/:resumeId/sections/:sectionId/subsections")
export class SubsectionResumeController {
  constructor(private readonly subsectionResumeService: SubsectionResumeService) {}

  @Post()
  async create(@Param("sectionId") sectionId: string, @Body("subsectionId") subsectionId: string, @Body("subsectionName", SubsectionNameValidationPipe) subsectionName: ResumeSubsectionNames, @Body("dto") dto: any, @Body("resumeId") resumeId: string) {
    return this.subsectionResumeService.createOne({ resumeId, subsectionId, subsectionName, sectionId, updates: dto });
  }

  @Delete(":subsectionId")
  async delete(@Param("subsectionId") subsectionId: string, @Body("subsectionName", SubsectionNameValidationPipe) subsectionName: ResumeSubsectionNames, @Body("resumeId") resumeId: string) {
    return this.subsectionResumeService.deleteOne({ resumeId, subsectionName, subsectionId });
  }

  @Get("count")
  async getCount(@Param("sectionId") sectionId: string, @Body("subsectionName", SubsectionNameValidationPipe) subsectionName: ResumeSubsectionNames) {
    return this.subsectionResumeService.getCount({ subsectionName, sectionId });
  }
}
