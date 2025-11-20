import { Document } from "@/types/document/document";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";

export function filterDocumentsByType(documents: Document[], type: DocumentTypeName) {
	return documents.filter(d => d.type.name === type);
}