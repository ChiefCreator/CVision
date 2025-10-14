import { BaseEntityFields, JSONValue } from "@/types/root";
import { SectionTemplate } from "../sectionTemplate/sectionTemplate";

export interface Section extends BaseEntityFields {
	documentId: string;
	templateId: string;
  parentId?: string;

  title?: string;
  data?: JSONValue;
  order: number;

  template: SectionTemplate;
  subsections: Section[];
}