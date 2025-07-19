import React from "react";

import Section from "../../Section/Section";
import CustomSubsection from "../../subsections/CustomSubsection/CustomSubsection";

import type { CustomSection } from "@/types/sectionTypes/sections";
import type { ChangeResumeField } from "@/types/resumeTypes/resumeUpdateFunctions";

interface CustomSectionProps {
  sectionData: CustomSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "customSections";
const subsectionName = "customSubsection";

export default React.memo(function CustomSection({ sectionData, isOpen, onToggle, onChange }: CustomSectionProps) {

  return (
    <Section
      id={sectionData.id}
      sectionName={sectionName}
      subsectionName={subsectionName}
      type="list"
      title={sectionData.title}
      defaultTitle={sectionData.defaultTitle}

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={value => onChange(`${sectionName}[${sectionData.id}].title`, value)}
    >
      {sectionData.data.map(subsection => (
        <CustomSubsection
          key={subsection.id}
          {...subsection}
          subsectionName={subsectionName}
          sectionId={sectionData.id}
          sectionName={sectionName}
  
          checkIsOpen={isOpen}
          onToggle={onToggle}
          onChange={onChange}
        />
      ))}
    </Section>
  );
})