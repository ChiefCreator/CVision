import { DocumentTypeName } from "../documentType/documentTypeName";
import { SectionDataMap } from "../section/sectionDataMap";

export type SectionTemplateKey<T extends DocumentTypeName = DocumentTypeName> = keyof SectionDataMap[T];