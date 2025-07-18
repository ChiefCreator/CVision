import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SectionResumeService } from 'src/section-resume/section-resume.service';

import { SECTION_LIST_NAMES, SECTION_NAMES } from 'src/section-resume/constants/section-names';

import { updateResumeField } from './utils/updateResumeField';
import { splitPath } from "./utils/splitPath";
import { flattenGeneralSection } from './utils/flattenGeneralSection';

import type { ResumeSectionNames } from '../section-resume/types/section-names.types';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeFieldUpdates, UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  private readonly resumeInclude: Record<string, any>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionResumeService: SectionResumeService
  ) {
    this.resumeInclude = {
      personalDetails: { include: { generalSection: true } },
      professionalSummary: { include: { generalSection: true } },
      hobbies: { include: { generalSection: true } },
      ...SECTION_LIST_NAMES.reduce((acc, name) => ({ ...acc, ...{ [name]: { include: { data: true, generalSection: true } }}}), {})
    };
  };

  async findAll() {
    const resumes = await this.prisma.resume.findMany({ include: this.resumeInclude });

    return resumes.map(resume => flattenGeneralSection(resume));
  }
  async findOne(id: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: this.resumeInclude
    });

    if (!resume) {
      throw new NotFoundException(`Resume with id ${id} not found`);
    }

    return flattenGeneralSection(resume);
  }

  async createOne(userId: string, dto: CreateResumeDto) {
    try {
      return this.prisma.$transaction(async tx => {
        const resume = await tx.resume.create({
          data: {
            userId,
            ...dto,
          },
        });
  
        const sectionsDataObj = await this.sectionResumeService.createDefaultOnes({ resumeId: resume.id, prisma: tx });

        return { ...resume, ...sectionsDataObj };
      })
    } catch (error) {
      throw new BadRequestException(`Couldn't create resume`, { cause: error });
    }
  }
  async deleteOne(resumeId: string) {
    return this.prisma.resume.delete({ where: { id: resumeId } });
  }
  async deleteUserAll(userId: string) {
    return this.prisma.resume.deleteMany({ where: { userId } });
  }

  async updateOne(resumeId: string, updates: ResumeFieldUpdates) {
    let resumeUpdates: UpdateResumeDto = {};
    let sections: UpdateResumeDto = {};

    for (const [path, pathData] of Object.entries(updates)) {
      const pathParts = splitPath(path);
      const rootPathPart = pathParts[0];
      const isSection = SECTION_NAMES.includes(rootPathPart as ResumeSectionNames);

      if (isSection) {
        sections = updateResumeField(sections, path, pathData);
      } else {
        resumeUpdates = updateResumeField(resumeUpdates, path, pathData);
      }
    }

    return this.prisma.$transaction(async (tx) => {
      if (Object.keys(resumeUpdates).length) {
        await (tx.resume as any).update({
          where: { id: resumeId },
          data: resumeUpdates,
        });
      }

      await Promise.all(Object.entries(sections).map(([sectionName, updates]) => (
        this.sectionResumeService.upsertOne({ sectionName: sectionName as ResumeSectionNames, resumeId, updates, prisma: tx })
      )))

      return this.findOne(resumeId);
    });
  }
}
