import type { BaseEntityFields } from "../root";
import type { PersonalDetails, ProfessionalSummary, EmploymentHistorySection, EducationSection, SkillSection, LanguageSection, LinkSection, CourseSection, InternshipSection, Hobbies, ExtraCurricularActivitySection, ReferenceSection, CustomSection } from "../resumeSection/sections";
import type { ResumeTemplateName } from "./template";

export interface Resume extends BaseEntityFields {
  title?: string;
  template: ResumeTemplateName;

  personalDetails?: PersonalDetails;
  professionalSummary?: ProfessionalSummary;
  employmentHistory?: EmploymentHistorySection;
  education?: EducationSection;
  skills?: SkillSection;
  languages?: LanguageSection;
  links?: LinkSection;
  courses?: CourseSection;
  internships?: InternshipSection;
  hobbies?: Hobbies;
  extraCurricularActivities?: ExtraCurricularActivitySection;
  references?: ReferenceSection;
  customSections?: CustomSection[];
}

export type CreateResume = Partial<Resume>;

export type UpdateResume = Partial<Omit<Resume, keyof BaseEntityFields>>;

export type ResumeFieldUpdates = Record<string, UpdateResume>;