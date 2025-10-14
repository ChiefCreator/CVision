import { Section } from "../resumeSection/section";
import { BaseEntityFields } from "../root";
import { DocumentTemplate } from "./documentTemplate/documentTemplate";
import { DocumentType } from "./documentType/documentType";

export interface Document extends BaseEntityFields {
	userId: string;
	typeId: string;
	templateId: string;

	title?: string;

	type: DocumentType;
	template: DocumentTemplate;
	sections: Section[];
}