import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Section } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { isSection } from "./isSection";

export function findSection<T extends DocumentTypeName, K extends SectionTemplateKey<T>>(
	sections: Section<T, SectionTemplateKey<T>>[],
	key: K
) {
  return sections.find((s): s is Section<T, K> => isSection(s, key));
}

export function filterSections<T extends DocumentTypeName, K extends SectionTemplateKey<T>>(
	sections: Section<T, SectionTemplateKey<T>>[],
	key: K
) {
  return sections.filter((s): s is Section<T, K> => isSection(s, key));
}