import type { ResumeSectionName } from "./sectionName";

export interface GeneralSection {
  id: string;
  type: ResumeSectionName;
  defaultTitle: string;
  description?: string;
}