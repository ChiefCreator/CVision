import { DocumentTemplate } from "../documentTemplate/documentTemplate";
import { SectionTemplate } from "../sectionTemplate/sectionTemplate";
import { DocumentTypeName } from "./documentTypeName";

export interface DocumentType<T extends DocumentTypeName = DocumentTypeName> {
  id: string;
  name: T;

  templates: DocumentTemplate<T>[];
  sectionTemplates: SectionTemplate[];
}