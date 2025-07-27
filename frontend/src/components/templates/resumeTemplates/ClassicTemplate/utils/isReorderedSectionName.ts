import { reorderedSectionNames } from "../constants/reorderedSectionNames";
import type { ReorderedSectionName } from "../types/reorderedSectionName";

export function isReorderedSectionName(value: string): value is ReorderedSectionName {
  return reorderedSectionNames.includes(value as ReorderedSectionName);
}