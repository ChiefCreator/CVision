import { CreateResume } from "@/types/resume/resume";
import { ResumeListSectionName } from "@/types/resumeSection/sectionName";

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