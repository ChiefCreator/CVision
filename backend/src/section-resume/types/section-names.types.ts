import { UpdateResumeDto } from "../../resume/dto/update-resume.dto";

export type ResumeSectionNames = keyof Omit<UpdateResumeDto, "title">;

export type SingleResumeSectionNames = Extract<ResumeSectionNames, "personalDetails" | "professionalSummary" | "hobbies">;
export type ListResumeSectionNames = Exclude<ResumeSectionNames, SingleResumeSectionNames>;
export type DefaultResumeSectionNames = Extract<ResumeSectionNames, "personalDetails" | "professionalSummary" | "employmentHistory" | "education" | "links" | "skills">;
export type ReorderedResumeSectionNames = Exclude<ResumeSectionNames, "personalDetails" | "professionalSummary">;