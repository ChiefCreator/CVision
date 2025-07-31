import type { Resume } from "../resume/resume";
import { ChangeResumeField } from "../resume/resumeUpdateFunctions";
import type { ResumeSectionName } from "./sectionName";
import { CustomSection } from "./sections";

export type Section = Resume[ResumeSectionName];

export interface SectionsMap extends Required<Pick<Omit<Resume, "customSections">, Exclude<ResumeSectionName, "customSections">>> {
  customSections: CustomSection;
}

export type SectionComponentProps<K extends ResumeSectionName> = {
  sectionData: SectionsMap[K];
  isOpen: (sectionId: string, subsectionId?: string) => boolean;
  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
};

export type SectionComponentMap = {
  [K in ResumeSectionName]: React.ComponentType<SectionComponentProps<K>> | null;
};