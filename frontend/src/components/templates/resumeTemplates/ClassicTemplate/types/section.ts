import type { Resume } from "@/types/resume/resume";
import type { CustomSection } from "@/types/resumeSection/sections";
import type { ResumeSectionName } from "@/types/resumeSection/sectionName";

export interface ClassicTemplateSectionsMap extends Required<Pick<Resume, Exclude<ResumeSectionName, "personalDetails" | "customSections">>> {
  customSections: CustomSection;
  personalInformation: {
    id: string;
    birthDate?: string,
    birthPlace?: string,
    nationality?: string,
    drivingLicense?: string,
  };
  head: {
    id: string;
    fullName?: string;
    jobTitle?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    email?: string;
  }
}

export type ClassicTemplateSection = ClassicTemplateSectionsMap[ClassicTemplateSectionName];

export type ClassicTemplateSectionName = keyof ClassicTemplateSectionsMap;