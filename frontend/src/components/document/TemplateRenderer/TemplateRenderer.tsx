import React from "react";

import type { Resume } from "@/types/resume/resume";
import type { ResumeTemplateName } from "@/types/resume/template";
import { CoverLetter } from "@/types/coverLetter/coverLetter";
import ResumeTemplateRenderer from "./ResumeTemplateRenderer";
import CoverLetterTemplateRenderer from "./CoverLetterTemplateRenderer";
import { CoverLetterTemplateName } from "@/types/coverLetter/template";
import { DocumentPerformance } from "@/types/document/document";

interface BaseTemplateRendererProps {
  performance?: DocumentPerformance;
}

export interface ResumeTemplateRendererProps extends BaseTemplateRendererProps {
  type: "resume";
  template: ResumeTemplateName;
  data: Resume;
}

export interface CoverLetterTemplateRendererProps extends BaseTemplateRendererProps {
  type: "coverLetter";
  template: CoverLetterTemplateName;
  data: CoverLetter;
}

export type TemplateRendererProps = ResumeTemplateRendererProps | CoverLetterTemplateRendererProps;

export default React.memo(function TemplateRenderer(props: TemplateRendererProps) {
  const type = props.type;

  return type === "resume" ? <ResumeTemplateRenderer {...props} /> : <CoverLetterTemplateRenderer {...props} />;
});
