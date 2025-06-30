import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeFieldUpdates } from './dto/update-resume.dto';

@Controller("resumes")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }
  @Get(":resumeId")
  findOne(@Param("resumeId") resumeId: string) {
    return this.resumeService.findOne(resumeId);
  }

  @Post()
  create(@Body() dto: CreateResumeDto) {
    return this.resumeService.create(process.env.TEST_USER_ID!, dto);
  }
  @Post(":resumeId")
  delete(@Param("resumeId") resumeId: string) {
    return this.resumeService.delete(resumeId);
  }
  @Put(":resumeId")
  async updateOne(@Param("resumeId") resumeId: string, @Body() resumeUpdates: ResumeFieldUpdates) {
    return this.resumeService.updateOne(resumeId, resumeUpdates);
  }
}
