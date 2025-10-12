import { DocumentTemplatesMap } from "./document-templates-map.types";
import { DocumentType } from "./document-type.types";

export type ResumeTemplate = DocumentTemplatesMap["resume"][number];

export type CoverLetterTemplate = DocumentTemplatesMap["coverLetter"][number];

export type DocumentTemplate = DocumentTemplatesMap[DocumentType][number];
