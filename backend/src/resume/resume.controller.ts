import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Authorization } from "src/auth/decorators/authentication.decorator";
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeFieldUpdates } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';

@Authorization()
@Controller("resumes")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get("general-sections")
  findGeneralSections() {
    return this.resumeService.findGeneralSections({});
  }

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }
  @Get(":resumeId")
  findOne(@Param("resumeId") resumeId: string) {
    return this.resumeService.findOne(resumeId);
  }

  @Post()
  createOne(@Body() dto: CreateResumeDto) {
    return this.resumeService.createOne(process.env.TEST_USER_ID!, dto);
  }
  @Delete(":resumeId")
  deleteOne(@Param("resumeId") resumeId: string) {
    return this.resumeService.deleteOne(resumeId);
  }
  @Authorization("admin")
  @Delete("user/:userId")
  deleteUserAll(@Param("userId") userId: string) {
    return this.resumeService.deleteUserAll(userId);
  }

  @Put(":resumeId")
  async updateOne(@Param("resumeId") resumeId: string, @Body() resumeUpdates: ResumeFieldUpdates) {
    return this.resumeService.updateOne(resumeId, resumeUpdates);
  }
}
