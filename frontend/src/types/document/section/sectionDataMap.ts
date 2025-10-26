import { LanguageLevel } from "@/types/language/languageLevel";
import { SkillLevel } from "@/types/skill/skillLevel";
import { DocumentTypeName } from "../documentType/documentTypeName";
import { SectionTemplateKey } from "../sectionTemplate/sectionTemplateKey";

export type SectionDataMap = {
  resume: {
    employmentHistory: {
      data: null;
      item: {
        city?: string;
        employer?: string;
        jobTitle?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
    };

    education: {
      data: null;
      item: {
        city?: string;
        school?: string;
        degree?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
    };

    professionalSummary: {
      data: {
        summary?: string;
      };
    };

    personalDetails: {
      data: {
        fullName?: string;
        jobTitle?: string;
        address?: string;
        city?: string;
        postalCode?: string;
        country?: string;
        phone?: string;
        email?: string;
        avatarUrl?: string;
        birthDate?: string;
        birthPlace?: string;
        nationality?: string;
        drivingLicense?: string;
      };
    };

    skills: {
      data: null;
      item: {
        title?: string;
        level?: SkillLevel;
      };
    };

    languages: {
      data: null;
      item: {
        title?: string;
        level?: LanguageLevel;
      };
    };

    courses: {
      data: null;
      item: {
        title?: string;
        institution?: string;
        startDate?: string;
        endDate?: string;
      };
    };

    hobbies: {
      data: {
        hobbyDescription?: string;
      };
    };

    internships: {
      data: null;
      item: {
        city?: string;
        employer?: string;
        jobTitle?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
    };

    extracurricularActivities: {
      data: null;
      item: {
        city?: string;
        employer?: string;
        functionTitle?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
    };

    references: {
      data: null;
      item: {
        referentFullName?: string;
        company?: string;
        phone?: string;
        email?: string;
      };
    };

    links: {
      data: null;
      item: {
        label?: string;
        url?: string;
      };
    };

    customSection: {
      data: null;
      item: {
        title?: string;
        city?: string;
        description?: string;
        startDate?: string;
        endDate?: string;
      };
    };
  };

  coverLetter: {
    personalDetails: {
      data: null;
      item: null;
    };
  };
};

export type SectionData<T extends DocumentTypeName, K extends SectionTemplateKey<T>> =
  SectionDataMap[T][K] extends { data: infer D } ? D : never;

export type SectionItemData<T extends DocumentTypeName, K extends SectionTemplateKey<T>> =
  SectionDataMap[T][K] extends { item: infer I } ? I : never;

export type SectionDataMapResume = SectionDataMap["resume"];
