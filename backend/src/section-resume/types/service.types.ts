import { Prisma } from "prisma/generated/client";
import { ResumeSectionNames } from "src/section-resume/types/section-names.types"

interface BaseMethod {
  sectionName: ResumeSectionNames;
  prisma?: Prisma.TransactionClient;
}

export interface FindOneByName extends BaseMethod {
  resumeId: string;
}
export interface FindOneById extends BaseMethod {
  id: string;
}

export interface CreateDefaultOnes {
  prisma?: BaseMethod["prisma"];
  resumeId: string;
}
export interface CreateOne extends BaseMethod {
  resumeId: string;
  sectionId?: string;
  updates?: any;
  order?: number;
}

export interface DeleteOne extends BaseMethod {
  sectionId: string;
}

export interface UpdateOne extends BaseMethod {
  sectionId: string;
  updates: any;
}
export interface UpsertOne extends BaseMethod {
  sectionId?: string;
  resumeId: string;
  updates: any;
}
export interface UpsertCustomOnes {
  resumeId: string;
  updates: any;
  prisma?: Prisma.TransactionClient;
}