import { Prisma } from "prisma/generated/client";
import type { ResumeSubsectionNames } from "./subsection-names.types";

interface BaseMethod {
  subsectionName: ResumeSubsectionNames;
  prisma?: Prisma.TransactionClient;
}

export interface CreateOne extends BaseMethod {
  subsectionId?: string;
  sectionId: string;
  updates?: any;
}
export interface DeleteOne extends BaseMethod {
  subsectionId: string;
}

export interface UpdateOne extends BaseMethod {
  subsectionId: string;
  updates: any;
}
export interface UpsertOne extends BaseMethod {
  sectionId: string;
  subsectionId: string;
  updates: any;
}