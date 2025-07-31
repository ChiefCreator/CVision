import { ResumeTemplateConfig } from "@/types/resume/template";
import ClassicTemplate from "../ClassicTemplate";
import { transformResume } from "../utils/transformResume";
import { CLASSIC_TEMPLATE_SECTION_NAMES } from "./sectionNames";

export const CLASSIC_TEMPLATE_CONFIG: ResumeTemplateConfig<"classic"> = {
  name: "classic",
  Component: ClassicTemplate,
  transformResume: transformResume,
  columns: [
    CLASSIC_TEMPLATE_SECTION_NAMES,
  ],
}