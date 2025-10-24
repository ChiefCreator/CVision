import { DocumentConfig } from "../documentConfig";
import { DocumentTypeName } from "../documentType/documentTypeName";

export type DocumentTemplateKey<T extends DocumentTypeName = DocumentTypeName> = DocumentConfig[T]["templates"][number];