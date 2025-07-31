import { reorderedSectionNames } from "../constants/reorderedSectionNames";

import type { ClassicTemplateDataItem } from "../types/data";
import type { ClassicTemplateReorderedDataItem, ClassicTemplateReorderedSectionName } from "../types/reorderedTypes";
import type { ClassicTemplateSectionName } from "../types/section";

export function isReorderedSectionName(value: string): value is ClassicTemplateReorderedSectionName {
  return reorderedSectionNames.includes(value as ClassicTemplateReorderedSectionName);
}

export function isReorderedDataItem(dataItem: ClassicTemplateDataItem): dataItem is ClassicTemplateReorderedDataItem {
  return reorderedSectionNames.includes(dataItem.name as ClassicTemplateReorderedSectionName);
}

export function isReorderedDataItemByName<N extends ClassicTemplateSectionName = ClassicTemplateSectionName>(dataItem: ClassicTemplateDataItem, checkedName: N)
  : dataItem is Extract<ClassicTemplateReorderedDataItem, { name: N }> {
    return dataItem.name === checkedName;
  }