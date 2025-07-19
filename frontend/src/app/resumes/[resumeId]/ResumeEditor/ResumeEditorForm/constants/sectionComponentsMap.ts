import Courses from "../sections/Courses/Courses";
import Education from "../sections/Education/Education";
import EmploymentHistory from "../sections/EmploymentHistory/EmploymentHistory";
import ExtraCurricularActivities from "../sections/ExtraCurricularActivities/ExtraCurricularActivities";
import Hobbies from "../sections/Hobbies/Hobbies";
import Internships from "../sections/Internships/Internships";
import Languages from "../sections/Languages/Languages";
import Links from "../sections/Links/Links";
import PersonalDetails from "../sections/PersonalDetails/PersonalDetails";
import ProfessionalSummary from "../sections/ProfessionalSummary/ProfessionalSummary";
import References from "../sections/References/References";
import Skills from "../sections/Skills/Skills";
import React from "react";
import CustomSection from "../sections/CustomSection/CustomSection";

import type { Resume } from "@/types/resumeTypes/resume";
import type { ChangeResumeField } from "@/types/resumeTypes/resumeUpdateFunctions";
import type { ResumeSectionName } from "@/types/sectionTypes/sectionName";
import type { CustomSection as CustomSectionType } from "@/types/sectionTypes/sections";

export interface SectionData extends Required<Omit<Resume, "customSections">> {
  customSections: CustomSectionType;
}

export type SectionComponentProps<K extends ResumeSectionName> = {
  sectionData: SectionData[K];
  isOpen: (sectionId: string, subsectionId?: string) => boolean;
  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
};

type SectionComponentMap = {
  [K in ResumeSectionName]: React.ComponentType<SectionComponentProps<K>> | null;
};

export const SECTION_COMPONENTS_MAP: SectionComponentMap = {
  personalDetails: PersonalDetails,
  professionalSummary: ProfessionalSummary,
  employmentHistory: EmploymentHistory,
  education: Education,
  links: Links,
  courses: Courses,
  skills: Skills,
  internships: Internships,
  languages: Languages,
  extraCurricularActivities: ExtraCurricularActivities,
  hobbies: Hobbies,
  references: References,
  customSections: CustomSection
};
