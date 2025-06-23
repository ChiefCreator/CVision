import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Prisma } from 'prisma/generated/client';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {};

  private readonly resumeInclude = {
    personalDetails: true,
    professionalSummary: true,
    employmentHistory: true,
    education: true,
    links: true,
    skills: true,
    languages: true,
    courses: true,
    customSections: true,
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
   async updateOne(resumeId: string, dto: UpdateResumeDto) {
    const existingResume = await this.findOne(resumeId);

    const ops: Prisma.PrismaPromise<unknown>[] = [];

    if (dto.title !== undefined) {
      ops.push(
        this.prisma.resume.update({
          where: { id: resumeId },
          data: { title: dto.title },
        })
      );
    }
    if (dto.personalDetails !== undefined) {
      ops.push(
        this.prisma.personalDetails.upsert({
          where: { resumeId },
          update: dto.personalDetails,
          create: {
            ...dto.personalDetails,
            resumeId,
          },
        })
      );
    }
    if (dto.professionalSummary !== undefined) {
      ops.push(
        this.prisma.professionalSummary.upsert({
          where: { resumeId },
          update: dto.professionalSummary,
          create: {
            ...dto.professionalSummary,
            resumeId,
          },
        })
      );
    }
    if (dto.employmentHistory !== undefined) {
      ops.push(
        this.prisma.employmentHistorySection.upsert({
          where: { resumeId },
          update: {
            order: dto.employmentHistory.order,
            data: {
              deleteMany: {},
              create: dto.employmentHistory.data,
            },
          },
          create: {
            resumeId,
            order: dto.employmentHistory.order,
            data: {
              create: dto.employmentHistory.data,
            },
          },
        })
      );
    }
    if (dto.education !== undefined) {
      ops.push(
        this.prisma.educationSection.upsert({
          where: { resumeId },
          update: {
            order: dto.education.order,
            data: {
              deleteMany: {},
              create: dto.education.data,
            },
          },
          create: {
            resumeId,
            order: dto.education.order,
            data: {
              create: dto.education.data,
            },
          },
        })
      );
    }
    if (dto.skills !== undefined) {
      ops.push(
        this.prisma.skillSection.upsert({
          where: { resumeId },
          update: {
            order: dto.skills.order,
            isShowLevel: dto.skills.isShowLevel ?? true,
            data: {
              deleteMany: {},
              create: dto.skills.data,
            },
          },
          create: {
            resumeId,
            order: dto.skills.order,
            isShowLevel: dto.skills.isShowLevel ?? true,
            data: {
              create: dto.skills.data,
            },
          },
        })
      );
    }
    if (dto.languages !== undefined) {
      ops.push(
        this.prisma.languageSection.upsert({
          where: { resumeId },
          update: {
            order: dto.languages.order,
            data: {
              deleteMany: {},
              create: dto.languages.data,
            },
          },
          create: {
            resumeId,
            order: dto.languages.order,
            data: {
              create: dto.languages.data,
            },
          },
        })
      );
    }
    if (dto.links !== undefined) {
      ops.push(
        this.prisma.linkSection.upsert({
          where: { resumeId },
          update: {
            order: dto.links.order,
            data: {
              deleteMany: {},
              create: dto.links.data,
            },
          },
          create: {
            resumeId,
            order: dto.links.order,
            data: {
              create: dto.links.data,
            },
          },
        })
      );
    }
    if (dto.courses !== undefined) {
      ops.push(
        this.prisma.courseSection.upsert({
          where: { resumeId },
          update: {
            order: dto.courses.order,
            data: {
              deleteMany: {},
              create: dto.courses.data,
            },
          },
          create: {
            resumeId,
            order: dto.courses.order,
            data: {
              create: dto.courses.data,
            },
          },
        })
      );
    }
    if (dto.customSections !== undefined) {
      ops.push(
        this.prisma.customSection.upsert({
          where: { resumeId },
          update: {
            order: dto.customSections.order,
            data: {
              deleteMany: {},
              create: dto.customSections.data,
            },
          },
          create: {
            resumeId,
            order: dto.customSections.order,
            data: {
              create: dto.customSections.data,
            },
          },
        })
      );
    }

    if (ops.length === 0) {
      throw new BadRequestException("No data to update");
    }

    return this.prisma.$transaction(ops);
  }
}
