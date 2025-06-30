import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { type ResumeSectionNames, isListResumeSection } from 'src/resume/types/ResumeSectionNames';
import type { UpdateResumeDto } from 'src/resume/dto/update-resume.dto';
import { CreateSections } from './types/create-sections';
import { Prisma } from 'prisma/generated/client';

@Injectable()
export class SectionResumeService {
  constructor(private readonly prisma: PrismaService) {}

  readonly sectionNames: ResumeSectionNames[] = ["personalDetails", "professionalSummary", "courses", "customSections", "education", "employmentHistory", "languages", "links", "skills"];
  private readonly createSectionNames: CreateSections[] = ["educationSection", "employmentHistorySection", "languageSection", "skillSection", "linkSection", "courseSection", "customSection"];;

  async create(sectionName: ResumeSectionNames, resumeId: string, updates: any = {}): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const order = await this.getSectionCount(resumeId, tx);

      return tx[sectionName].create({
        data: {
          ...updates,
          order,
          resume: { connect: { id: resumeId } },
        },
      });
    });
  }
  async delete(sectionName: ResumeSectionNames, sectionId: string): Promise<void> {
    return this.prisma.$transaction(async (tx) => {
      const section = await tx[sectionName].findUnique({ where: { id: sectionId } });

      if (!section) throw new NotFoundException(`Section not found in resume`);

      const resumeId = section.resumeId;

      await tx[sectionName].delete({ where: { id: sectionId } });

      await this.reorderSectionsAfterDelete(tx, resumeId, section.order);

      return section;
    });
  }
  async update(sectionName: ResumeSectionNames, resumeId: string, updates: any): Promise<any> {
    return this.prisma[sectionName].update({
      where: { resumeId },
      data: updates
    })
  }

  async upsert({ sectionName, dataName }: { sectionName: ResumeSectionNames, dataName?: string }, resumeId: string, updates: UpdateResumeDto[ResumeSectionNames]): Promise<void> {
    if (isListResumeSection(updates)) {
      const { data, ...restProps } = updates || {};

      const isSection = await this.prisma[sectionName].findUnique({ where: { resumeId }});

      let section: any = {};

      if (isSection) {
        section = await this.update(sectionName, resumeId, restProps);
      } else {
        section = await this.create(sectionName, resumeId, restProps);
      }

      if (!dataName) throw new NotFoundException(`Section not found in resume`);;

      const promises = data?.map(async (item: any): Promise<any> => {
        const id = item.id;

        return this.prisma[dataName].upsert({
          where: { id },
          update: item,
          create: {
            ...item,
            section: { connect: { id: section.id } }
          }
        });
      })

      if (promises) await Promise.all(promises);
    } else {
      await this.prisma[sectionName].upsert({
        where: { resumeId },
        update: { ...updates },
        create: { resumeId, ...updates },
      })
    }
  }

  private async getSectionCount(resumeId: string, tx: Prisma.TransactionClient) {
    const [employmentCount, educationCount, linkCount, skillCount, languageCount, courseCount, customCount] = await Promise.all([
      tx.employmentHistorySection.count({ where: { resumeId } }),
      tx.educationSection.count({ where: { resumeId } }),
      tx.linkSection.count({ where: { resumeId } }),
      tx.skillSection.count({ where: { resumeId } }),
      tx.languageSection.count({ where: { resumeId } }),
      tx.courseSection.count({ where: { resumeId } }),
      tx.customSection.count({ where: { resumeId } }),
    ]);
  
    return (
      employmentCount +
      educationCount +
      linkCount +
      skillCount +
      languageCount +
      courseCount +
      customCount
    );
  }
  private async reorderSectionsAfterDelete(tx: Prisma.TransactionClient, resumeId: string, deletedOrder: number) {
    const updatePromises = this.createSectionNames.map(async (model) => {
      await (tx[model] as any).updateMany({
        where: {
          resumeId,
          order: { gt: deletedOrder },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    });

    await Promise.all(updatePromises);
  }

  getSectionAndDataModelNames(sectionName: ResumeSectionNames) {
    const sectionModels = {
      personalDetails: {
        sectionName: "personalDetails",
      },
      professionalSummary: {
        sectionName: "professionalSummary",
      },
      employmentHistory: {
        sectionName: "employmentHistorySection",
        dataName: "employmentHistory",
      },
      education: {
        sectionName: "educationSection",
        dataName: "education",
      },
      links: {
        sectionName: "linkSection",
        dataName: "link",
      },
      skills: {
        sectionName: "skillSection",
        dataName: "skill",
      },
      languages: {
        sectionName: "languageSection",
        dataName: "language",
      },
      courses: {
        sectionName: "courseSection",
        dataName: "course",
      },
      customSections: {
        sectionName: "customSection",
        dataName: "customData",
      },
    };

    return sectionModels[sectionName] as { sectionName: ResumeSectionNames, dataName?: string };
  }
}