import { Prisma } from "prisma/generated/client";
import { ResumeSectionNames } from "src/section-resume/types/section-names.types"

export interface FindGeneralSections {
  prisma?: Prisma.TransactionClient;
}
export interface findGeneralSectionByType {
  type: ResumeSectionNames;
  prisma?: Prisma.TransactionClient;
}