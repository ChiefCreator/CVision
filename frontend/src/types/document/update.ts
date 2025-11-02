import { Document } from "./document";
import { UpdateDocumentSettingsDto } from "./documentSettings/updateDocumentSettingsDto";
import { UpdateSectionDto } from "./section/updateSectionDto";


export interface UpdateDocumentDto extends Partial<Pick<Document, 
	| "title"
	| "updatedAt"
	| "templateId"
>> {
	sections?: UpdateSectionDto[];
	settings?: UpdateDocumentSettingsDto;
}

export type DocumentFieldUpdates = Record<string, UpdateDocumentDto>;