import { BaseEntityFields } from "@/types/root";
import { DocumentTypeName } from "../documentType/documentTypeName";
import { SectionTemplate } from "../sectionTemplate/sectionTemplate";
import { SectionTemplateKey } from "../sectionTemplate/sectionTemplateKey";
import { SectionData, SectionItemData } from "./sectionDataMap";

export interface Section<
  T extends DocumentTypeName = DocumentTypeName,
  K extends SectionTemplateKey<T> = SectionTemplateKey<T>,
> extends BaseEntityFields {
	documentId: string;
	templateId: string;
  parentId?: string;

  title?: string;
  data?: SectionData<T, K>;
  order: number;

  template: SectionTemplate<T>;
  subsections: SectionItemData<T, K> extends never
    ? []
    : (Omit<Section<T, K>, "data" | "subsections"> & { data?: SectionItemData<T, K>; subsections: [] })[];
}

export type Subsection<
  T extends DocumentTypeName = DocumentTypeName,
  K extends SectionTemplateKey<T> = SectionTemplateKey<T>
> = (Omit<Section<T, K>, "data" | "subsections"> & { data?: SectionItemData<T, K>; subsections: [] })