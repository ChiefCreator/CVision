import { Resume } from "../resume/resume";
import { BaseEntityFields } from "../root";

export type ResumeSectionName = keyof Omit<Resume, keyof BaseEntityFields | "title" | "template">;
export type ResumeSingleSectionName = Extract<ResumeSectionName, "personalDetails" | "professionalSummary" | "hobbies">;
export type ResumeListSectionName = Exclude<ResumeSectionName, ResumeSingleSectionName>;
export type ResumeDefaultSectionName = Extract<ResumeSectionName, "personalDetails" | "professionalSummary" | "employmentHistory" | "education" | "links" | "skills">;
export type ResumeAdditionalSectionName = Exclude<ResumeSectionName, ResumeDefaultSectionName>;
export type ResumeReorderedSectionName = Exclude<ResumeSectionName, "personalDetails" | "professionalSummary">;
