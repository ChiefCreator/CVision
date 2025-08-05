import { CoverLetter } from "@/types/coverLetter/coverLetter";
import { Document } from "@/types/document/document";
import { Resume } from "@/types/resume/resume";

export function transformResumesToDocumentFormat(data: Resume[]): Document[] {
  return data.map(data => ({ type: "resume", data }));
}

export function transformCoverLettersToDocumentFormat(data: CoverLetter[]): Document[] {
  return data.map(data => ({ type: "coverLetter", data }));
}