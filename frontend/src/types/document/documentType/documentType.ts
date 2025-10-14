import { DocumentTemplate } from "../documentTemplate/documentTemplate";
import { SectionTemplate } from "../sectionTemplate/sectionTemplate";
import { DocumentTypeName } from "./documentTypeName";

export interface DocumentType {
  id: string;
  name: DocumentTypeName;

  templates: DocumentTemplate[];
  sectionTemplates: SectionTemplate[];
}