import { RESUME_TEMPLATES } from "@/constants/resumeTemplates";

import type { Resume } from "./resume";

export type ResumeTemplateName = keyof typeof RESUME_TEMPLATES;

export interface ResumeTemplateProps {
  data: Resume;
}