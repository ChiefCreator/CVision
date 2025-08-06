import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ResumeService } from 'src/resume/resume.service';

import type { CreateOne, DeleteOne, GetCount, ReorderOnesAfterDelete, UpdateOne } from './types/service.types';

@Injectable()
export class SubsectionResumeService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ResumeService))
    private readonly resumeService: ResumeService,
  ) {}

  async createOne({ resumeId, subsectionId, subsectionName, sectionId, updates = {}, prisma = this.prisma }: CreateOne) {
    const order = await this.getCount({ subsectionName, sectionId, prisma });

    await this.resumeService.setUpdatedAt({ resumeId, prisma });
    
    return (prisma[subsectionName] as any).create({
      data: {
        ...updates,
        id: subsectionId,
        order,
        section: { connect: { id: sectionId } },
      }
    });
  }
  async deleteOne({ resumeId, subsectionName, subsectionId }: DeleteOne) {
    return this.prisma.$transaction(async (tx) => {
      const subsection = await (tx[subsectionName] as any).findUnique({ where: { id: subsectionId } });
      if (!subsection) throw new NotFoundException(`Subsection ${subsectionName} not found in resume`);

      const { sectionId, order} = subsection || {};

      await (tx[subsectionName] as any).delete({ where: { id: subsectionId } });
      await this.reorderOnesAfterDelete({ subsectionName, sectionId, deletedOrder: order, prisma: tx });

      await this.resumeService.setUpdatedAt({ resumeId, prisma: tx });

      return subsection;
    });
  }

  async updateOne({ subsectionName, subsectionId, updates = {}, prisma = this.prisma }: UpdateOne) {
    return (prisma[subsectionName] as any).update({
      where: { id: subsectionId },
      data: updates,
    });
  }

  async getCount({ subsectionName, sectionId, prisma = this.prisma }: GetCount) {
    return (prisma[subsectionName] as any).count({ where: { sectionId } });
  }
  private async reorderOnesAfterDelete({ subsectionName, sectionId, deletedOrder, prisma = this.prisma }: ReorderOnesAfterDelete) {
    return (prisma[subsectionName] as any).updateMany({
      where: {
        sectionId,
        order: { gt: deletedOrder },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });
  }
}