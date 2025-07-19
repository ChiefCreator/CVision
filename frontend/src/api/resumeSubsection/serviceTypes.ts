import { CreateResume } from "@/types/resumeTypes/resume";

export interface CreateOne {
  resumeId: string;
  sectionId: string;
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