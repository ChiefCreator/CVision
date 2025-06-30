import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeFieldUpdates, UpdateResumeDto } from './dto/update-resume.dto';
import { splitPath } from "./utils/splitPath";
import { updateResumeField } from './utils/updateResumeField';
import { SectionResumeService } from 'src/section-resume/section-resume.service';
import { BadRequestException } from '@nestjs/common';

import { ResumeSectionNames } from './types/ResumeSectionNames';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService, private readonly sectionResumeService: SectionResumeService) {};
  
  private readonly resumeInclude = {
    personalDetails: true,
    professionalSummary: true,
    employmentHistory: {
      include: {
        data: true
      }
    },
    education: {
      include: {
        data: true
      }
    },
    links: {
      include: {
        data: true
      }
    },
    skills: {
      include: {
        data: true
      }
    },
    languages: {
      include: {
        data: true
      }
    },
    courses: {
      include: {
        data: true
      }
    },
    customSections: {
      include: {
        data: true
      }
    },
  }

  async findAll() {
    return this.prisma.resume.findMany({ 
      include: this.resumeInclude
    });
  }
  async findOne(id: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: this.resumeInclude
    });

    if (!resume) {
      throw new NotFoundException(`Resume with id ${id} not found`);
    }

    return resume;
  }

  async create(userId: string, dto: CreateResumeDto) {
    return this.prisma.resume.create({
      data: {
        userId: userId,
        title: dto.title,
      },
    });
  }
  async delete(resumeId: string) {
    return this.prisma.resume.delete({
      where: { id: resumeId }
    });
  }
  async updateOne(resumeId: string, updates: ResumeFieldUpdates) {
    let resumeUpdates: UpdateResumeDto = {};
    let sections: UpdateResumeDto = {};

    for (const [path, pathData] of Object.entries(updates)) {
      const pathParts = splitPath(path);
      const rootPathPart = pathParts[0];

      if (this.sectionResumeService.sectionNames.includes(rootPathPart as ResumeSectionNames)) {
        sections = updateResumeField(sections, path, pathData);
      }
      else if (!this.sectionResumeService.sectionNames.includes(rootPathPart as ResumeSectionNames)) {
        resumeUpdates = updateResumeField(resumeUpdates, path, pathData)
      }
      else {
        throw new BadRequestException("Resume update error");
      }
    }

    await this.prisma.$transaction(async (tx) => {
      if (Object.keys(resumeUpdates).length) {
        await (tx.resume as any).update({
          where: { id: resumeId },
          data: resumeUpdates,
        });
      }
  
      for (let [sectionName, updates] of Object.entries(sections)) {
        const sectionAndDataModelNames = this.sectionResumeService.getSectionAndDataModelNames(sectionName as ResumeSectionNames);

        await this.sectionResumeService.upsert(sectionAndDataModelNames, resumeId, updates);
      }
    });
  }
}
