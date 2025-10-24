import { BaseEntityFields } from "../root";
import { DocumentSettings } from "./documentSettings/documentSettings";
import { DocumentTemplate } from "./documentTemplate/documentTemplate";
import { DocumentType } from "./documentType/documentType";
import { DocumentTypeName } from "./documentType/documentTypeName";
import { Section } from "./section/section";

export interface Document<T extends DocumentTypeName = DocumentTypeName> extends BaseEntityFields {
	userId: string;
	typeId: string;
	templateId: string;

	title?: string;
	settings: DocumentSettings;

	type: DocumentType<T>;
	template: DocumentTemplate<T>;
	sections: Section<T>[];
}