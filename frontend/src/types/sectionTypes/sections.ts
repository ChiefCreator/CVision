import type { BaseSectionResume, BaseSubsectionResume } from "@/types/rootTypes";

export interface PersonalDetails extends BaseSectionResume {
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
export interface ProfessionalSummary extends BaseSectionResume {
  summary?: string;
}

export interface EmploymentHistorySection extends BaseSectionResume {
  data: EmploymentHistory[];
}
export interface EmploymentHistory extends BaseSubsectionResume {
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
export interface Education extends BaseSubsectionResume {
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
export interface Link extends BaseSubsectionResume {
  label?: string;
  url?: string;
}

export interface SkillSection extends BaseSectionResume {
  data: Skill[];
  isShowLevel: boolean;
}
export interface Skill extends BaseSubsectionResume {
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
export interface Language extends BaseSubsectionResume {
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
export interface Course extends BaseSubsectionResume {
  title?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
}

export interface InternshipSection extends BaseSectionResume {
  data: Internship[];
}
export interface Internship extends BaseSubsectionResume {
  jobTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface Hobbies extends BaseSectionResume {
  hobbyDescription?: string;
}

export interface ExtraCurricularActivitySection extends BaseSectionResume {
  data: ExtraCurricularActivity[];
}
export interface ExtraCurricularActivity extends BaseSubsectionResume {
  functionTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface ReferenceSection extends BaseSectionResume {
  data: Reference[];
}
export interface Reference extends BaseSubsectionResume {
  referentFullName?: string;
  company?: string;
  phone?: string;
  email?: string;
}

export interface CustomSection extends BaseSectionResume {
  data: CustomData[];
}
export interface CustomData extends BaseSubsectionResume {
  title?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}