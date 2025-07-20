import type { SingleResumeSectionNames, ListResumeSectionNames, ResumeSectionNames, ReorderedResumeSectionNames } from "../types/section-names.types";
import type { UpdateResumeDto } from "src/resume/dto/update-resume.dto";

import { SECTION_SINGLE_NAMES, SECTION_LIST_NAMES, SECTION_REORDERED_NAMES, CUSTOM_SECTIONS_NAME } from "../constants/section-names";

export function isSingleResumeSection(name: string): name is SingleResumeSectionNames {
  return SECTION_SINGLE_NAMES.includes(name as SingleResumeSectionNames);
}
export function isListResumeSection(name: string): name is ListResumeSectionNames {
  return SECTION_LIST_NAMES.includes(name as ListResumeSectionNames);
}
export function isListResumeSectionByData(data: UpdateResumeDto[ResumeSectionNames]): data is UpdateResumeDto[ListResumeSectionNames] {
  return (typeof data === "object" && data !== null && "data" in data);
}
export function isReorderedResumeSection(name: string): name is ReorderedResumeSectionNames {
  return SECTION_REORDERED_NAMES.includes(name as ReorderedResumeSectionNames);
}
export function isResumeCustomSection(name: string): name is "customSections" {
  return name === CUSTOM_SECTIONS_NAME;
}