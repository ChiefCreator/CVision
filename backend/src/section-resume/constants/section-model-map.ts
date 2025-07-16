import { ResumeSectionNames } from "../types/section-names.types";
import { ResumeSubsectionNames } from "src/subsection-resume/types/subsection-names.types";

type SectionModelMap = {
  [K in ResumeSectionNames]?: {
    sectionName: ResumeSectionNames;
    subsectionName?: ResumeSubsectionNames;
  };
}

export const SECTION_MODEL_MAP: SectionModelMap = {
  personalDetails: { sectionName: "personalDetails" },
  professionalSummary: { sectionName: "professionalSummary" },
  employmentHistory: {
    sectionName: "employmentHistory",
    subsectionName: "employmentHistorySubsection"
  },
  education: {
    sectionName: "education",
    subsectionName: "educationSubsection"
  },
  skills: {
    sectionName: "skills",
    subsectionName: "skillSubsection"
  },
  languages: {
    sectionName: "languages",
    subsectionName: "languageSubsection"
  },
  links: {
    sectionName: "links",
    subsectionName: "linkSubsection"
  },
  courses: {
    sectionName: "courses",
    subsectionName: "courseSubsection"
  },
  internships: {
    sectionName: "internships",
    subsectionName: "internshipSubsection"
  },
  hobbies: {
    sectionName: "hobbies",
    subsectionName: "hobbySubsection"
  },
  extraCurricularActivities: {
    sectionName: "extraCurricularActivities",
    subsectionName: "extraCurricularActivitySubsection"
  },
  references: {
    sectionName: "references",
    subsectionName: "referenceSubsection"
  },
  customSections: {
    sectionName: "customSections",
    subsectionName: "customSubsection"
  }
};
