import React from "react";

import { COVER_LETTER_TEMPLATES } from "@/constants/coverLetterTemplates";

import type { CoverLetterTemplateRendererProps } from "./TemplateRenderer";

export default React.memo(function CoverLetterTemplateRenderer ({ template, data }: CoverLetterTemplateRendererProps) {
  const SelectedTemplate = COVER_LETTER_TEMPLATES[template];
  
  return <SelectedTemplate data={data} />;
});
