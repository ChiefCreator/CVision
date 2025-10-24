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

	allowedChildren: SectionTemplateRelation<T>[];
	allowedParents: SectionTemplateRelation<T>[];
}

export interface SectionTemplateRelation<T extends DocumentTypeName = DocumentTypeName> {
  id: string;
  parentId: string;
  childId: string;

	parentTemplate: SectionTemplate<T>;
  childTemplate: SectionTemplate<T>;
}