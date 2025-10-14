import { DOCUMENT_TYPES_MAP } from "@/constants/document/documentTypesMap";
import { DocumentTypeName } from "../documentType/documentTypeName";

export type DocumentTemplateKey = (typeof DOCUMENT_TYPES_MAP)[DocumentTypeName]["templates"][number];