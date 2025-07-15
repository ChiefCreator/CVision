import { CreateResume } from "@/types/resumeTypes";

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