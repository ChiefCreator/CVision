import { DocumentType } from "../documentType/documentType";
import { DocumentTemplateKey } from "./documentTemplateKey";

export interface DocumentTemplate {
  id: string;
  documentTypeId: string;

  key: DocumentTemplateKey;
  title: string;
  description?: string;
  previewUrl?: string;

	documentType: DocumentType;
}
