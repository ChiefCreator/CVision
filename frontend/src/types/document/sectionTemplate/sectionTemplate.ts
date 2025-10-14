import { JSONValue } from "@/types/root";
import { SectionTemplateKey } from "./sectionTemplateKey";

export interface SectionTemplate {
	id: string;
	documentTypeId: string;

	key: SectionTemplateKey;
	title: string;
	schema?: JSONValue;
	isDefault: boolean;
	isOrderFixed: boolean;
	defaultOrder?: number;
	isMultiple: boolean;

	allowedChildren: SectionTemplateRelation[];
	allowedParents: SectionTemplateRelation[];
}

export interface SectionTemplateRelation {
  id: string;
  parentId: string;
  childId: string;

	parentTemplate: SectionTemplate;
  childTemplate: SectionTemplate;
}