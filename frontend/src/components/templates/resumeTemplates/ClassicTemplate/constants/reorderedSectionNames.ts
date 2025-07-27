import { SECTION_NAMES } from "@/constants/sectionNames";

import type { ReorderedSectionName } from "../types/reorderedSectionName";

export const reorderedSectionNames = SECTION_NAMES.filter(name => !["links", "personalDetails"].includes(name)) as ReorderedSectionName[];
