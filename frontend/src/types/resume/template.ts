import type { ClassicTemplateColumns } from "@/components/templates/resumeTemplates/ClassicTemplate/types/columns";
import type { ClassicTemplateData } from "@/components/templates/resumeTemplates/ClassicTemplate/types/data";
import type { Resume } from "@/types/resume/resume";
import { PersonalDetails, ProfessionalSummary } from "../resumeSection/sections";

export type ResumeTemplateName = "classic" | "modern";


export interface ResumeTemplateDataMap {
  modern: (PersonalDetails | ProfessionalSummary)[];
  classic: ClassicTemplateData;
}
export interface ResumeTemplateComponentProps<T extends ResumeTemplateName = ResumeTemplateName> {
  data: ResumeTemplateDataMap[T];
}

export interface ResumeTemplateColumnsMap {
  modern: null;
  classic: ClassicTemplateColumns;
}

export interface ResumeTemplateConfig<T extends ResumeTemplateName = ResumeTemplateName> {
  name: T;
  Component: React.ComponentType<ResumeTemplateComponentProps<T>>;
  transformResume: (resume: Resume) => ResumeTemplateDataMap[T];
  columns: ResumeTemplateColumnsMap[T];
}
export type ResumeTemplateConfigsMap = {
  [K in ResumeTemplateName]: ResumeTemplateConfig<K> | null;
}