import { JSONValue } from "@/types/root";
import { DocumentTypeName } from "../documentType/documentTypeName";
import { SectionTemplateKey } from "./sectionTemplateKey";

export interface SectionTemplate<T extends DocumentTypeName = DocumentTypeName> {
	id: string;
	documentTypeId: string;

	key: SectionTemplateKey<T>;
	title: string;
	schema?: JSONValue;
	isDefault: boolean;
	isOrderFixed: boolean;
	defaultOrder?: number;
	isMultiple: boolean;
	isRequired: boolean;

	allowedChild?: SectionTemplate<T>;
	allowedParent?: SectionTemplate<T>;
}