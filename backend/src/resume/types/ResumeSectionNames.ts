import { UpdateResumeDto } from "../dto/update-resume.dto";

export type ResumeSectionNames = keyof Omit<UpdateResumeDto, "title">;

export type SingleResumeSectionNames = Extract<ResumeSectionNames, "personalDetails" | "professionalSummary">;
export type ListResumeSectionNames = Exclude<ResumeSectionNames, "personalDetails" | "professionalSummary">;

export function isListResumeSection(data: UpdateResumeDto[ResumeSectionNames]): data is UpdateResumeDto[ListResumeSectionNames] {
  return (typeof data === "object" && data !== null && "data" in data);
}