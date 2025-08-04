import { DocumentType } from "@/types/document/document";
import { Resume } from "@/types/resume/resume";
import { CoverLetter } from "@/types/coverLetter/coverLetter";

export type DocumentFullType = DocumentType | "all";

export interface DocumentTabDataMap {
  resume: Resume[] | null;
  coverLetter: CoverLetter[] | null;
  all: (Resume | CoverLetter)[] | null;
}

export interface DocumentTab<T extends DocumentFullType = DocumentFullType> {
  title: string;
  data: DocumentTabDataMap[T];
}

export type DocumentTabsMap = {
  [T in DocumentFullType]: DocumentTab<T>;
}