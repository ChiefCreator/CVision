import type { BaseEntityFields } from "../rootTypes";
import type { PersonalDetails, ProfessionalSummary, EmploymentHistorySection, EducationSection, SkillSection, LanguageSection, LinkSection, CourseSection, InternshipSection, Hobbies, ExtraCurricularActivitySection, ReferenceSection, CustomSection } from "../sectionTypes/sections";

export interface Resume extends BaseEntityFields {
  title?: string;

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

export type CreateResume = Resume["title"];

export type UpdateResume = Partial<Omit<Resume, keyof BaseEntityFields>>;

export type ResumeFieldUpdates = Record<string, UpdateResume>;