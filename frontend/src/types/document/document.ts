import { CoverLetter } from "../coverLetter/coverLetter";
import { Resume } from "../resume/resume";

export type DocumentType = "resume" | "coverLetter";

export type DocumentPerformance = "preview" | "print";


export interface DocumentDataMap {
  resume: Resume;
  coverLetter: CoverLetter
}

export type DocumentData = DocumentDataMap[DocumentType];

export type DocumentMap = {
  [K in DocumentType]: {
    type: K;
    data: DocumentDataMap[K];
  }
}

export type Document = DocumentMap[DocumentType];