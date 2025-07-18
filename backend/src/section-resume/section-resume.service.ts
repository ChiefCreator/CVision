import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { SubsectionResumeService } from 'src/subsection-resume/subsection-resume.service';

import { SECTION_DEFAULT_NAMES, SECTION_REORDERED_NAMES, CUSTOM_SECTIONS_NAME } from './constants/section-names';
import { SECTION_MODEL_MAP } from './constants/section-model-map';
import { isReorderedResumeSection, isSingleResumeSection } from './utils/section-names.utils';

import type { CreateDefaultOnes, CreateOne, DeleteOne, findGeneralSectionByType, FindGeneralSections, FindOneById, FindOneByName, UpdateOne, UpsertOne } from './types/service.types';

@Injectable()
export class SectionResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subsectionResumeService: SubsectionResumeService
  ) {}

  async findOneByName({ sectionName, resumeId, prisma = this.prisma }: FindOneByName) {
    return (prisma[sectionName] as any).findFirst({ where: { resumeId } });
  }
  async findOneById({ sectionName, id, prisma = this.prisma }: FindOneById) {
    return (prisma[sectionName] as any).findUnique({ where: { id } });
  }
  async findGeneralSections({ prisma = this.prisma }: FindGeneralSections) {
    return prisma.generalSection.findMany();
  }
  async findGeneralSectionByType({ type, prisma = this.prisma }: findGeneralSectionByType) {
    return prisma.generalSection.findFirst({ where: { type } });
  }

  async createOne({ sectionName, resumeId, updates = {}, order: orderProp, prisma = this.prisma}: CreateOne) {
    if (sectionName !== CUSTOM_SECTIONS_NAME) {
      const isSectionExist = await this.findOneByName({ sectionName, resumeId });
      if (isSectionExist) throw new NotFoundException(`Section ${sectionName} exists in resume`);
    }

    const order = orderProp || await this.getSectionCount(resumeId, prisma);
    const { data: subsectionUpdates, ...sectionUpdates } = updates;

    const generalSection = await this.findGeneralSectionByType({ type: sectionName, prisma });
    if (!generalSection) throw new NotFoundException(`Couldn't find generalSection with type ${sectionName}`);

    const section = await (prisma[sectionName] as any).create({
      data: {
        ...sectionUpdates,
        ...(isReorderedResumeSection(sectionName) ? { order } : {}),
        resume: { connect: { id: resumeId } },
        generalSection: { connect: { id: generalSection.id } },
      },
    });
    if (!section) throw new NotFoundException(`Couldn't create ${sectionName} section`);

    if (isSingleResumeSection(sectionName)) return { [sectionName]: { ...generalSection, ...section } };
        
    const subsectionName = SECTION_MODEL_MAP[sectionName]?.subsectionName;
    if (!subsectionName) throw new NotFoundException(`Couldn't create ${subsectionName} subsection for ${sectionName} section`);

    const subsections = subsectionUpdates?.length ? await Promise.all(subsectionUpdates.map((updates: any) => {
      return this.subsectionResumeService.createOne({
        subsectionName,
        sectionId: section.id,
        updates,
        prisma
      });
    })) : [];

    return {
      [sectionName]: {
        ...generalSection,
        ...section,
        data: subsections,
      }
    };
  }
  async createDefaultOnes({ resumeId, prisma = this.prisma}: CreateDefaultOnes) {
    const createSectionPromises = Promise.all(SECTION_DEFAULT_NAMES.map((sectionName, i) => this.createOne({ sectionName, resumeId, order: i, prisma })));
    
    const sectionsData = await createSectionPromises;

    return sectionsData.reduce((acc, section) => ({ ...acc, ...section }), {});
  }
  async deleteOne({ sectionName, sectionId }: DeleteOne) {
    return this.prisma.$transaction(async (tx) => {
      const section = await (tx[sectionName] as any).findUnique({ where: { id: sectionId } });

      if (!section) throw new NotFoundException(`Section not found in resume`);

      const resumeId = section.resumeId;

      await (tx[sectionName] as any).delete({ where: { id: sectionId } });

      await this.reorderSectionsAfterDelete(tx, resumeId, section.order);

      return section;
    });
  }

  async updateOne({ sectionName, sectionId, updates, prisma = this.prisma }: UpdateOne) {
    const { data, ...sectionUpdates } = updates || {};

    const section = await (prisma[sectionName] as any).update({
      where: { id: sectionId },
      data: sectionUpdates
    })

    if (!data) return section;

    const subsectionName = SECTION_MODEL_MAP[sectionName]?.subsectionName;
    if (!subsectionName) throw new NotFoundException(`Section not found in resume`);

    const subsections = await Promise.all(data.map((updates: any) => {
      return this.subsectionResumeService.updateOne({
        subsectionName,
        subsectionId: updates.id,
        updates,
        prisma
      });
    }));

    return {
      ...section,
      data: subsections,
    }
  }
  async upsertOne({ sectionName, resumeId, updates, prisma = this.prisma }: UpsertOne) {
    const existingSection = await (prisma[sectionName] as any).findUnique({ where: { resumeId }});

    return existingSection
      ? this.updateOne({ sectionName, sectionId: existingSection.id, updates, prisma })
      : this.createOne({ sectionName, resumeId, updates, prisma });
  }

  private async getSectionCount(resumeId: string, tx: Prisma.TransactionClient) {
    const sectionCounts = await Promise.all(SECTION_REORDERED_NAMES.map(name => (tx[name] as any).count({ where: { resumeId } })));
  
    return sectionCounts.reduce((acc, count) => acc + count , 0);
  }
  private async reorderSectionsAfterDelete(tx: Prisma.TransactionClient, resumeId: string, deletedOrder: number) {
    const updatePromises = SECTION_REORDERED_NAMES.map(sectionName => {
      return (tx[sectionName] as any).updateMany({
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

    return Promise.all(updatePromises);
  }
}