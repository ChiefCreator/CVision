import { Resume } from "prisma/generated/client";

export function flattenGeneralSection(resume: Resume) {
  const updatedResume = { ...resume };

  for (const key in resume) {
    const section = resume[key];
    const generalSection = section?.generalSection;

    if (generalSection) {
      const { id, type, ...generalSectionProps } = generalSection;
      updatedResume[key] = { ...section, ...generalSectionProps };
      delete updatedResume[key].generalSection;
    }
  }

  return updatedResume;
}
