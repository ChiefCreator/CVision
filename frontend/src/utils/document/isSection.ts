import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Section } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";

export function isSection<T extends DocumentTypeName, K extends SectionTemplateKey<T>>(
	section: Section<T, K>,
	key: K
): section is Section<T, K> {
	return section.template.key === key;
}