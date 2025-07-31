import { CLASSIC_TEMPLATE_SECTION_NAMES } from "./sectionNames";

import type { ClassicTemplateReorderedSectionName } from "../types/reorderedTypes";

export const reorderedSectionNames = CLASSIC_TEMPLATE_SECTION_NAMES.filter(name => !["links", "personalDetails", "head"].includes(name)) as ClassicTemplateReorderedSectionName[];
