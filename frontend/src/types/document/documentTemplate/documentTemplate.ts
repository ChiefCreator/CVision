import { DocumentSettings } from "../documentSettings/documentSettings";
import { DocumentType } from "../documentType/documentType";
import { DocumentTypeName } from "../documentType/documentTypeName";
import { DocumentTemplateKey } from "./documentTemplateKey";

export interface DocumentTemplate<T extends DocumentTypeName = DocumentTypeName> {
  id: string;
  documentTypeId: string;

  key: DocumentTemplateKey<T>;
  title: string;
  description?: string;
  previewUrl?: string;
  settings?: DocumentSettings;

  premium: boolean;
  supportsFontSizing: boolean;
  supportsSpacing: boolean;
  supportsCustomAccentColor: boolean;
  supportsPhoto: boolean;
  supportedFormats: string[];

	documentType: DocumentType<T>;
}