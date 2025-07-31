import React from "react";

import TemplatePages from "../TemplatePages/TemplatePages";

import { RESUME_TEMPLATE_CONFIGS_MAP } from "@/constants/resume/resumeTemplateConfigsMap";

import type { ResumeTemplateRendererProps } from "./TemplateRenderer";
import { ResumeTemplateConfig } from "@/types/resume/template";

export default React.memo(function ResumeTemplateRenderer({ template, data, performance }: ResumeTemplateRendererProps) {
  const config = RESUME_TEMPLATE_CONFIGS_MAP[template] as ResumeTemplateConfig<typeof template>;
  if (!config) return;

  return <TemplatePages resume={data} template={config} performance={performance} />;
});
