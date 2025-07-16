import type { ResumeSectionNames, ListResumeSectionNames, SingleResumeSectionNames, DefaultResumeSectionNames, ReorderedResumeSectionNames } from "./../types/section-names.types";

export const SECTION_NAMES: ResumeSectionNames[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "skills", "languages", "links", "courses", "internships", "hobbies", "extraCurricularActivities", "references", "customSections"];
export const SECTION_LIST_NAMES: ListResumeSectionNames[] = [ "education", "skills", "languages", "links", "courses", "internships", "extraCurricularActivities", "references", "customSections"];
export const SECTION_SINGLE_NAMES: SingleResumeSectionNames[] = ["personalDetails", "professionalSummary", "hobbies"];
export const SECTION_DEFAULT_NAMES: DefaultResumeSectionNames[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "skills",];
export const SECTION_REORDERED_NAMES: ReorderedResumeSectionNames[] = ["employmentHistory", "education", "skills", "languages", "links", "courses", "internships", "hobbies", "extraCurricularActivities", "references", "customSections"];
export const CUSTOM_SECTIONS_NAME: "customSections" = "customSections";