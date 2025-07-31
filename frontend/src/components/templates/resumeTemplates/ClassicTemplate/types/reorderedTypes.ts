import type { ClassicTemplateSectionsMap } from "./section";
import type { ClassicTemplateSectionName } from "./section";

export type ClassicTemplateReorderedSectionName = Exclude<ClassicTemplateSectionName, "personalInformation" | "links" | "head">;


// Section
export type ClassicTemplateReorderedSectionsMap = Pick<ClassicTemplateSectionsMap, ClassicTemplateReorderedSectionName>;

export type ClassicTemplateReorderedSection = ClassicTemplateReorderedSectionsMap[ClassicTemplateReorderedSectionName];


// Data
export type ClassicTemplateReorderedDataItem = {
  [K in ClassicTemplateReorderedSectionName]: {
    name: K;
    data: ClassicTemplateReorderedSectionsMap[K];
  };
}[ClassicTemplateReorderedSectionName];

export type ClassicTemplateReorderedData = ClassicTemplateReorderedDataItem[];


// ComponentProps
export type ClassicTemplateReorderedSectionComponentProps<N extends ClassicTemplateReorderedSectionName> = {
  data: ClassicTemplateReorderedSectionsMap[N];
}


// Component
export type ClassicTemplateReorderedSectionComponentsMap = {
  [N in ClassicTemplateReorderedSectionName]: React.ComponentType<ClassicTemplateReorderedSectionComponentProps<N>>;
}
