import type { BaseSectionResume } from "@/types/root";
import type { Course, CustomData, Education, EmploymentHistory, ExtraCurricularActivity, Internship, Language, Link, Skill, Reference } from "../resumeSubsection/subsections";

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

export interface EducationSection extends BaseSectionResume {
  data: Education[];
}

export interface LinkSection extends BaseSectionResume {
  data: Link[];
}

export interface SkillSection extends BaseSectionResume {
  data: Skill[];
  isShowLevel: boolean;
}

export interface LanguageSection extends BaseSectionResume {
  data: Language[];
}

export interface CourseSection extends BaseSectionResume {
  data: Course[];
}

export interface InternshipSection extends BaseSectionResume {
  data: Internship[];
}

export interface Hobbies extends BaseSectionResume {
  hobbyDescription?: string;
}

export interface ExtraCurricularActivitySection extends BaseSectionResume {
  data: ExtraCurricularActivity[];
}

export interface ReferenceSection extends BaseSectionResume {
  data: Reference[];
}

export interface CustomSection extends BaseSectionResume {
  data: CustomData[];
}