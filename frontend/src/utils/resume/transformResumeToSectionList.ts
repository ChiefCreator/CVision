import type { Resume } from "@/types/resume/resume";
import type { Section } from "@/types/resumeSection/section";
import type { ResumeSectionName } from "@/types/resumeSection/sectionName";

import { SECTION_NAMES } from "@/constants/resumeSection/sectionNames";

export function transformResumeToSectionList(resume: Resume) {
  return SECTION_NAMES.reduce((acc, sectionName) => {
    return [...acc, { section: resume[sectionName], sectionName }];
  }, [] as { section: Section; sectionName: ResumeSectionName }[]);
}