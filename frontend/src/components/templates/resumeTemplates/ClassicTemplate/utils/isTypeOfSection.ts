import type { ClassicTemplateDataItem } from "../types/data";
import type { ClassicTemplateSectionName } from "../types/section";

export function isTypeOfSection<N extends ClassicTemplateSectionName = ClassicTemplateSectionName>(item: ClassicTemplateDataItem, checkedName: N): item is Extract<ClassicTemplateDataItem, { name: N }> {
  return item.name === checkedName;
}