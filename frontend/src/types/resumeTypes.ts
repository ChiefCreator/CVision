import type { BaseEntityFields, BaseSectionResume } from "./rootTypes";

export interface Resume extends BaseEntityFields {
  title?: string;

  personalDetails?: PersonalDetails;
  professionalSummary?: ProfessionalSummary;
  employmentHistory?: EmploymentHistorySection;
  education?: EducationSection;
  links?: LinkSection;
  skills?: SkillSection;
  languages?: LanguageSection;
  courses?: CourseSection;
  customSections?: CustomSection;
}

export type CreateResume = Resume["title"];
export type UpdateResume = Partial<Omit<Resume, keyof BaseEntityFields>>;

export interface PersonalDetails {
  id: string;

  avatarUrl?: string;
  jobTitle?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  drivingLicense?: string;
  birthPlace?: string;
  birthDate?: string;
  nationality?: string;
}
export interface ProfessionalSummary {
  summary?: string;
}

export interface EmploymentHistorySection extends BaseSectionResume {
  data: EmploymentHistory[];
}
export interface EmploymentHistory {
  jobTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface EducationSection extends BaseSectionResume {
  data: Education[];
}
export interface Education {
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface LinkSection extends BaseSectionResume {
  data: Link[];
}
export interface Link {
  label?: string;
  url?: string;
}

export interface SkillSection extends BaseSectionResume {
  data: Skill[];
}
export interface Skill {
  title?: string;
  level: SkillLevel;
}
export enum SkillLevel {
  Novice = "novice",
  Beginner = "beginner",
  Skillful = "skillful",
  Experienced = "experienced",
  Expert = "expert",
}

export interface LanguageSection extends BaseSectionResume {
  data: Language[];
}
export interface Language {
  title?: string;
  level?: LanguageLevel;
}
export enum LanguageLevel {
  NativeSpeaker = "nativeSpeaker",
  HighlyProficient = "highlyProficient",
  GoodWorkingKnowledge = "goodWorkingKnowledge",
  WorkingKnowledge = "workingKnowledge",
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export interface CourseSection extends BaseSectionResume {
  data: Course[];
}
export interface Course {
  title?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
}

export interface CustomSection extends BaseSectionResume {
  data: CustomData[];
}
export interface CustomData {
  title?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}
