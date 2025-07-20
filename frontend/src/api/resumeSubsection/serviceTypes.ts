import { CreateResume } from "@/types/resumeTypes/resume";
import { ResumeListSectionName } from "@/types/sectionTypes/sectionName";

export interface CreateOne {
  resumeId: string;
  sectionId: string;
  sectionName: ResumeListSectionName;
  subsectionId: string;
  subsectionName: string;
  dto?: CreateResume
}
export interface DeleteOne {
  resumeId: string;
  sectionId: string;
  subsectionId: string;
  subsectionName: string;
}