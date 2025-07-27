import React from "react";

import type { Resume } from "@/types/resumeTypes/resume";
import type { ResumeTemplateName } from "@/types/resumeTypes/template";
import { CoverLetter } from "@/types/coverLetterTypes/coverLetter";
import ResumeTemplateRenderer from "./ResumeTemplateRenderer";
import CoverLetterTemplateRenderer from "./CoverLetterTemplateRenderer";
import { CoverLetterTemplateName } from "@/types/coverLetterTypes/template";

export interface ResumeTemplateRendererProps {
  type: "resume";
  template: ResumeTemplateName;
  data: Resume;
}

export interface CoverLetterTemplateRendererProps {
  type: "coverLetter";
  template: CoverLetterTemplateName;
  data: CoverLetter;
}

export type TemplateRendererProps = ResumeTemplateRendererProps | CoverLetterTemplateRendererProps;

export default React.memo(function TemplateRenderer(props: TemplateRendererProps) {
  const type = props.type;

  return type === "resume" ? <ResumeTemplateRenderer {...props} /> : <CoverLetterTemplateRenderer {...props} />;
});
