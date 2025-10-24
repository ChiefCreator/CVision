import { Document } from "@/types/document/document";
import { DocumentTemplateKey } from "@/types/document/documentTemplate/documentTemplateKey";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";

export interface CreateDocumentDto {
  type: DocumentTypeName;
	template: DocumentTemplateKey;
	title?: string;
}

export interface DeleteOne {
	message: string;
	document: Document;
}