import { DocumentType, DocumentMap, Document } from "@/types/document/document";

export type DocumentTabType = DocumentType | "all";

export interface DocumentTabDataMap {
  resume?: DocumentMap["resume"][];
  coverLetter?: DocumentMap["coverLetter"][];
  all?: Document[];
}

export type DocumentTabsMap = {
  [T in DocumentTabType]: DocumentTab;
}

export interface DocumentTab {
  title: string;
  data?: Document[];
}