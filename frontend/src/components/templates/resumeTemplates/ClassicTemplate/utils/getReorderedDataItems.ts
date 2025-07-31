import { isReorderedDataItem } from "./isReordered";
import type { ClassicTemplateDataItem } from "../types/data";

export const getReorderedDataItems = (items: ClassicTemplateDataItem[]) => {
  return items.filter(isReorderedDataItem);
}