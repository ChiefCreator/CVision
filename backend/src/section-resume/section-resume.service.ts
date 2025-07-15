import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { DefaultResumeSectionNames, ListResumeSectionNames, ReorderedResumeSectionNames, ResumeSectionNames, SingleResumeSectionNames } from 'src/section-resume/types/ResumeSectionNames';
import type { UpdateResumeDto } from 'src/resume/dto/update-resume.dto';
import { Prisma } from 'prisma/generated/client';
import { SubsectionResumeService } from 'src/subsection-resume/subsection-resume.service';
import { ResumeSubsectionNames } from 'src/subsection-resume/types/ResumeSubsectionNames';

import type { CreateDefaultOnes, CreateOne, DeleteOne, FindOneById, FindOneByName, UpdateOne, UpsertOne } from './types/serviceTypes';

@Injectable()
export class SectionResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subsectionResumeService: SubsectionResumeService
  ) {}

  readonly sectionNames: ResumeSectionNames[] = ["personalDetails", "professionalSummary", "courses", "customSections", "education", "employmentHistory", "languages", "links", "skills"];
  readonly sectionListNames: ListResumeSectionNames[] = ["education", "employmentHistory", "languages", "skills", "links", "courses", "customSections"];
  readonly sectionSingleNames: SingleResumeSectionNames[] = ["personalDetails", "professionalSummary"];
  readonly sectionDefaultNames: DefaultResumeSectionNames[] = ["personalDetails", "professionalSummary", "education", "employmentHistory", "links", "skills"];
  readonly sectionReorderedNames: ReorderedResumeSectionNames[] = ["education", "employmentHistory", "languages", "skills", "links", "courses", "customSections"];
  readonly customSectionsName: "customSections" = "customSections";

  isSingleResumeSection(name: string): name is SingleResumeSectionNames {
    return this.sectionSingleNames.includes(name as SingleResumeSectionNames);
  }
  isListResumeSection(name: string): name is ListResumeSectionNames {
    return this.sectionListNames.includes(name as ListResumeSectionNames);
  }
  isListResumeSectionByData(data: UpdateResumeDto[ResumeSectionNames]): data is UpdateResumeDto[ListResumeSectionNames] {
    return (typeof data === "object" && data !== null && "data" in data);
  }
  isReorderedResumeSection(name: string): name is ReorderedResumeSectionNames {
    return this.sectionReorderedNames.includes(name as ReorderedResumeSectionNames);
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
        sectionName: "employmentHistory",
        subsectionName: "employmentHistorySubsection",
      },
      education: {
        sectionName: "education",
        subsectionName: "educationSubsection",
      },
      links: {
        sectionName: "links",
        subsectionName: "linkSubsection",
      },
      skills: {
        sectionName: "skills",
        subsectionName: "skillSubsection",
      },
      languages: {
        sectionName: "languages",
        subsectionName: "languageSubsection",
      },
      courses: {
        sectionName: "courses",
        subsectionName: "courseSubsection",
      },
      customSections: {
        sectionName: "customSections",
        subsectionName: "customDataSubsection",
      },
    };

    return sectionModels[sectionName] as { sectionName: ResumeSectionNames, subsectionName?: ResumeSubsectionNames };
  }

  async findOneByName({ sectionName, resumeId, prisma = this.prisma }: FindOneByName) {
    return (prisma[sectionName] as any).findFirst({ where: { resumeId } });
  }
  async findOneById({ sectionName, id, prisma = this.prisma }: FindOneById) {
    return (prisma[sectionName] as any).findUnique({ where: { id } });
  }

  async createOne({ sectionName, resumeId, updates = {}, order: orderProp, prisma = this.prisma}: CreateOne) {
    if (sectionName !== this.customSectionsName) {
      const isSectionExist = await this.findOneByName({ sectionName, resumeId });
      if (isSectionExist) throw new NotFoundException(`Section ${sectionName} exists in resume`);
    }

    const order = orderProp || await this.getSectionCount(resumeId, prisma);

    if (this.isSingleResumeSection(sectionName)) {
      const section = await (prisma[sectionName] as any).create({
        data: {
          ...updates,
          defaultTitle: "Без названия",
          ...(this.isReorderedResumeSection(sectionName) ? { order } : {}),
          resume: { connect: { id: resumeId } },
        },
      });

      if (!section) {
        throw new NotFoundException(`Couldn't create ${sectionName} section`);
      }

      return { [sectionName]: section };
    }

    const { data: subsectionUpdates, ...sectionUpdates } = updates;
  
    const section = await (prisma[sectionName] as any).create({
      data: {
        ...sectionUpdates,
        defaultTitle: "Без названия",
        ...(this.isReorderedResumeSection(sectionName) ? { order } : {}),
        resume: { connect: { id: resumeId } },
      },
    });

    if (!section) {
      throw new NotFoundException(`Couldn't create ${sectionName} section`);
    }
        
    const subsectionName = this.getSectionAndDataModelNames(sectionName).subsectionName;
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
        ...section,
        data: subsections,
      }
    };
  }
  async createDefaultOnes({ resumeId, prisma = this.prisma}: CreateDefaultOnes) {
    const createSectionPromises = Promise.all(this.sectionDefaultNames.map((sectionName, i) => this.createOne({ sectionName, resumeId, order: i, prisma })));

    
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

    const subsectionName = this.getSectionAndDataModelNames(sectionName).subsectionName;
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
    const sectionCounts = await Promise.all(this.sectionReorderedNames.map(name => (tx[name] as any).count({ where: { resumeId } })));
  
    return sectionCounts.reduce((acc, count) => acc + count , 0);
  }
  private async reorderSectionsAfterDelete(tx: Prisma.TransactionClient, resumeId: string, deletedOrder: number) {
    const updatePromises = this.sectionReorderedNames.map(sectionName => {
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