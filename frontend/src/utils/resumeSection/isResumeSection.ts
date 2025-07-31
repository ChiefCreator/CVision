import type { Resume } from "@/types/resume/resume";
import type { ResumeSectionName, ResumeSingleSectionName, ResumeListSectionName, ResumeDefaultSectionName, ResumeReorderedSectionName } from "@/types/resumeSection/sectionName";

import { SECTION_SINGLE_NAMES, SECTION_LIST_NAMES, SECTION_REORDERED_NAMES, SECTION_DEFAULT_NAMES } from "@/constants/resumeSection/sectionNames";

export function isSingleResumeSection(name: string): name is ResumeSingleSectionName {
  return SECTION_SINGLE_NAMES.includes(name as ResumeSingleSectionName);
}
export function isListResumeSection(name: string): name is ResumeListSectionName {
  return SECTION_LIST_NAMES.includes(name as ResumeListSectionName);
}
export function isDefaultResumeSection(name: string): name is ResumeDefaultSectionName {
  return SECTION_DEFAULT_NAMES.includes(name as ResumeDefaultSectionName);
}
export function isReorderedResumeSection(name: string): name is ResumeReorderedSectionName {
  return SECTION_REORDERED_NAMES.includes(name as ResumeReorderedSectionName);
}
export function isListResumeSectionByData(section: Resume[ResumeSectionName]): section is Resume[ResumeListSectionName]  {
  if ("data" in section!) {
    return true;
  }

  return false;
}