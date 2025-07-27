import type { DocumentType } from "../types/document.types"

type DocumentMap = {
  [key in DocumentType]: string;
}
export const DOCUMENTS_MAP: DocumentMap = {
  resume: "resumes",
  coverLetter: "coverLetters",
}