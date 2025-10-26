import { SectionTemplateKey } from "../sectionTemplate/sectionTemplateKey";
import { Section } from "./section";

export interface CreateSection extends Partial<Pick<Section, 
	| "title"
	| "parentId"
	| "data"
	| "subsections"
>> {
	template: SectionTemplateKey;
	documentId: string;
}