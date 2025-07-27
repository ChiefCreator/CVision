import type { Resume } from "@/types/resumeTypes/resume";
import type { ResumeSectionName } from "@/types/sectionTypes/sectionName";
import type { SectionData } from "@/app/resumes/[resumeId]/ResumeEditor/ResumeEditorForm/constants/sectionComponentsMap";

interface SectionDataT {
  name: ResumeSectionName;
  data: SectionData[ResumeSectionName];
  order?: number;
};

export function resumeToSections(resume: Resume, selectedSectionNames?: ResumeSectionName[]) {
  const { id, title, createdAt, updatedAt, template, customSections, ...rest } = resume;

  const sections: SectionDataT[] = [];

  for (const key in rest) {
    const name = key as Exclude<ResumeSectionName, "customSections">;
    const data = rest[name];

    if (selectedSectionNames && !selectedSectionNames.includes(name)) continue;
    if (!selectedSectionNames || selectedSectionNames.includes(name)) {
      if (data && key !== "customSections") {
        const order = Array.isArray(data) && data[0]?.order !== undefined
          ? data[0].order
          : (data as any)?.order ?? 0;
  
        sections.push({ name, data, order });
      }
    }
  }

  if ((!selectedSectionNames || selectedSectionNames.includes("customSections")) && Array.isArray(customSections)) {
    customSections.forEach((section) => {
      sections.push({ name: "customSections", data: section, order: section.order ?? 0 });
    });
  }

  sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return sections.map(({ order, ...rest }) => rest);
}

