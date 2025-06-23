import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma.service';
import type { CreateSections } from './types/create-sections';
import { createSectionNames } from './data/createSectionNames';

@Injectable()
export class SectionResumeService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly createSectionNames = createSectionNames;

  async create<T extends CreateSections>(model: T, resumeId: string): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const order = await this.getSectionCount(resumeId, tx);

      return (tx[model] as any).create({
        data: {
          order,
          resume: { connect: { id: resumeId } },
        },
      });
    });
  }
  async delete<T extends CreateSections>(model: T, sectionId: string): Promise<void> {
    return this.prisma.$transaction(async (tx) => {
      const section = await (tx[model] as any).findUnique({ where: { id: sectionId } });

      if (!section) throw new NotFoundException(`Section not found in resume`);

      const resumeId = section.resumeId;

      await (tx[model] as any).delete({ where: { id: sectionId } });

      await this.reorderSectionsAfterDelete(tx, resumeId, section.order);

      return section;
    });
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
}
