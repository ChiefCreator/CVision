import type { Resume } from "@/types/resumeTypes/resume";
import type { CustomSection } from "@/types/sectionTypes/sections";
import type { ReorderedSectionName } from "./reorderedSectionName";
import { ResumeSectionName } from "@/types/sectionTypes/sectionName";

export interface ReorderedSectionData extends Required<Omit<Resume, Exclude<ResumeSectionName, ReorderedSectionName> | "customSections">> {
  customSections: CustomSection;
}
export type ReorderedSectionProps<K extends ReorderedSectionName> = {
  data: ReorderedSectionData[K];
};

export type ReorderedSectionComponentMap = {
  [K in ReorderedSectionName]: React.ComponentType<ReorderedSectionProps<K>> | null;
};