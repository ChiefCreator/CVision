import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import EducationSubsection from "../../subsections/EducationSubsection/EducationSubsection";

import type { ResumeSectionChangeObj, EducationSection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

interface EducationProps {
  sectionData?: EducationSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "education";
const subsectionName = "educationSubsection";

export default React.memo(function Education({ sectionData, isOpen, onToggle, onChange }: EducationProps) {
  const changeObj: ResumeSectionChangeObj<EducationSection, keyof Omit<EducationSection, "title">> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
  }

  return (
    <Section
      id={sectionData?.id}
      sectionName={sectionName}
      subsectionName={subsectionName}
      type="subsection"
      title={sectionData?.title}
      defaultTitle={sectionData?.defaultTitle}
      description="Разнообразное образование, указанное в вашем резюме, подытоживает ценность ваших знаний и опыта работы."

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      {sectionData?.data.map(subsection => (
        <EducationSubsection
          key={subsection.id}
          {...subsection}
          subsectionName={subsectionName}
          sectionId={sectionData?.id}
          sectionName={sectionName}
  
          checkIsOpen={isOpen}
          onToggle={onToggle}
          onChange={onChange}
        />
      ))}
    </Section>
  );
})