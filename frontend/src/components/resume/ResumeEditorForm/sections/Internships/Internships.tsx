import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import EmploymentHistorySubsection from "../../subsections/EmploymentHistorySubsection";

import type { InternshipSection } from "@/types/resumeSection/sections";
import type { ChangeResumeField } from "@/types/resume/resumeUpdateFunctions";
import type { ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import { sortByOrder } from "@/utils/subsection/sortByOrder";

interface InternshipsProps {
  sectionData: InternshipSection;
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
      id={sectionData.id}
      sectionName={sectionName}
      subsectionName={subsectionName}
      type="list"
      title={sectionData.title}
      defaultTitle={sectionData.defaultTitle}
      description={sectionData.description}

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      {sortByOrder(sectionData.data).map(subsection => (
        <EmploymentHistorySubsection
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