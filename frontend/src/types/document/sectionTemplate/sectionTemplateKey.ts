import { DOCUMENT_TYPES_MAP } from "@/constants/document/documentTypesMap";
import { DocumentTypeName } from "../documentType/documentTypeName";

export type SectionTemplateKey = (typeof DOCUMENT_TYPES_MAP)[DocumentTypeName]["sectionTemplates"][number];