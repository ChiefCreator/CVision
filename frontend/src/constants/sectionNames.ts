import type { ResumeSectionName, ResumeSingleSectionName, ResumeListSectionName, ResumeDefaultSectionName, ResumeReorderedSectionName, ResumeAdditionalSectionName } from "@/types/sectionTypes/sectionName";

export const SECTION_NAMES: ResumeSectionName[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "skills", "languages", "links", "courses", "internships", "hobbies", "extraCurricularActivities", "references", "customSections"];
export const SECTION_LIST_NAMES: ResumeListSectionName[] = [ "education", "skills", "languages", "links", "courses", "internships", "extraCurricularActivities", "references", "customSections"];
export const SECTION_SINGLE_NAMES: ResumeSingleSectionName[] = ["personalDetails", "professionalSummary", "hobbies"];
export const SECTION_DEFAULT_NAMES: ResumeDefaultSectionName[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "skills",];
export const SECTION_ADDITIONAL_NAMES: ResumeAdditionalSectionName[] = ["languages", "courses", "internships", "hobbies", "extraCurricularActivities", "references", "customSections"]
export const SECTION_REORDERED_NAMES: ResumeReorderedSectionName[] = ["employmentHistory", "education", "skills", "languages", "links", "courses", "internships", "hobbies", "extraCurricularActivities", "references", "customSections"];
export const CUSTOM_SECTIONS_NAME: "customSections" = "customSections";