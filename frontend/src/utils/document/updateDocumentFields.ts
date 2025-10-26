import { DocumentFieldUpdates, UpdateDocument } from "@/types/document/update";
import { updateDocumentField } from "./updateDocumentField";

export function updateDocumentFields<T extends UpdateDocument>(document: T, updates: DocumentFieldUpdates): T {
  let result = structuredClone(document);

  for (const [path, value] of Object.entries(updates)) {
    result = updateDocumentField(result, path, value);
  }
  
  return result;
}