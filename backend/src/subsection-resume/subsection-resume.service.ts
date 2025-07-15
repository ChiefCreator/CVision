import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOne, DeleteOne, UpdateOne } from './types/serviceTypes';

@Injectable()
export class SubsectionResumeService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne({ subsectionId, subsectionName, sectionId, updates = {}, prisma = this.prisma }: CreateOne) {
    return (prisma[subsectionName] as any).create({
      data: {
        ...updates,
        id: subsectionId,
        section: { connect: { id: sectionId } },
      }
    });
  }
  async deleteOne({ subsectionName, subsectionId }: DeleteOne) {
    return (this.prisma[subsectionName] as any).delete({ where: { id: subsectionId } });
  }

  async updateOne({ subsectionName, subsectionId, updates = {}, prisma = this.prisma }: UpdateOne) {
    return (prisma[subsectionName] as any).update({
      where: { id: subsectionId },
      data: updates,
    });
  }
}