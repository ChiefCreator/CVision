import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import EmploymentHistorySubsection from "../../subsections/EmploymentHistorySubsection/EmploymentHistorySubsection";

import type { ResumeSectionChangeObj, InternshipSection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

interface InternshipsProps {
  sectionData?: InternshipSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "internships";
const subsectionName = "internshipSubsection";

export default React.memo(function Internships({ sectionData, isOpen, onToggle, onChange }: InternshipsProps) {
  const changeObj: ResumeSectionChangeObj<InternshipSection, keyof Omit<InternshipSection, "title">> = {
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
        <EmploymentHistorySubsection
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