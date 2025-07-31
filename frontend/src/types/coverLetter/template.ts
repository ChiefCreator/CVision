import { COVER_LETTER_TEMPLATES } from "@/constants/coverLetter/coverLetterTemplates";

import type { CoverLetter } from "./coverLetter";

export type CoverLetterTemplateName = keyof typeof COVER_LETTER_TEMPLATES;

export interface CoverLetterTemplateProps {
  data: CoverLetter;
}