import { ResumeSectionName } from "@/types/sectionTypes/sectionName";

export type ReorderedSectionName = Exclude<ResumeSectionName, "personalDetails" | "links">;