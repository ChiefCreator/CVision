import type { ClassicTemplateSectionName, ClassicTemplateSectionsMap } from "./section";

export type ClassicTemplateData = ClassicTemplateDataItem[];

export type ClassicTemplateDataItem = {
  [K in ClassicTemplateSectionName]: {
    name: K;
    data: ClassicTemplateSectionsMap[K];
  };
}[ClassicTemplateSectionName];
