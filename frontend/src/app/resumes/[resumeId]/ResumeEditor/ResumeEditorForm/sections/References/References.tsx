import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import ReferenceSubsection from "../../subsections/ReferenceSubsection/ReferenceSubsection";

import type { ResumeSectionChangeObj, ReferenceSection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

interface ReferencesProps {
  sectionData?: ReferenceSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "references";
const subsectionName = "referenceSubsection";

export default React.memo(function References({ sectionData, isOpen, onToggle, onChange }: ReferencesProps) {
  const changeObj: ResumeSectionChangeObj<ReferenceSection, keyof Omit<ReferenceSection, "title">> = {
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

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      {sectionData?.data.map(subsection => (
        <ReferenceSubsection
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