import React from "react";

import { RESUME_TEMPLATES } from "@/constants/resumeTemplates";

import type { ResumeTemplateRendererProps } from "./TemplateRenderer";

export default React.memo(function ResumeTemplateRenderer ({ template, data }: ResumeTemplateRendererProps) {
  const SelectedTemplate = RESUME_TEMPLATES[template];
  
  return <SelectedTemplate data={data} />;
});
