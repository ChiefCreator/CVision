import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import EmploymentHistorySubsection from "../../subsections/EmploymentHistorySubsection";

import type { EmploymentHistorySection } from "@/types/resumeSection/sections";
import type { ChangeResumeField } from "@/types/resume/resumeUpdateFunctions";
import type { ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import { sortByOrder } from "@/utils/subsection/sortByOrder";

interface EmploymentHistoryProps {
  sectionData: EmploymentHistorySection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "employmentHistory";
const subsectionName = "employmentHistorySubsection";

export default React.memo(function EmploymentHistory({ sectionData, isOpen, onToggle, onChange }: EmploymentHistoryProps) {
  const changeObj: ResumeSectionChangeObj<EmploymentHistorySection, keyof Omit<EmploymentHistorySection, "title">> = {
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