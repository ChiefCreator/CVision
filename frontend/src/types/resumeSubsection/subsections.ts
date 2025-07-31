import { LanguageLevel } from "../language/languageLevel";
import { SkillLevel } from "../skill/skillLevel";

import type { BaseSubsectionResume } from "../root";

export interface EmploymentHistory extends BaseSubsectionResume {
  jobTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface Education extends BaseSubsectionResume {
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface Link extends BaseSubsectionResume {
  label?: string;
  url?: string;
}

export interface Skill extends BaseSubsectionResume {
  title?: string;
  level: SkillLevel;
}

export interface Language extends BaseSubsectionResume {
  title?: string;
  level?: LanguageLevel;
}

export interface Course extends BaseSubsectionResume {
  title?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
}

export interface Internship extends BaseSubsectionResume {
  jobTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface ExtraCurricularActivity extends BaseSubsectionResume {
  functionTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
}

export interface Reference extends BaseSubsectionResume {
  referentFullName?: string;
  company?: string;
  phone?: string;
  email?: string;
}

export interface CustomData extends BaseSubsectionResume {
  title?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}