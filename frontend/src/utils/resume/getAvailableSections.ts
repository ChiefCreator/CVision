import type { Resume } from "@/types/resume/resume";

import { SECTION_NAMES } from "@/constants/resumeSection/sectionNames";

export function getAvailableSections(resume: Resume) {
  return SECTION_NAMES.filter(sectionName => !!resume[sectionName]);
}