import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import EmploymentHistorySubsection from "../../subsections/EmploymentHistorySubsection/EmploymentHistorySubsection";

import type { ResumeSectionChangeObj, EmploymentHistorySection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

interface EmploymentHistoryProps {
  sectionData?: EmploymentHistorySection;
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
      id={sectionData?.id}
      sectionName={sectionName}
      subsectionName={subsectionName}
      type="subsection"
      title={sectionData?.title}
      defaultTitle={sectionData?.defaultTitle}
      description="Покажите свой соответствующий опыт (за последние 10 лет). Отмечайте свои достижения пунктами, по возможности - цифрами /фактами (достиг X, измерил по Y, выполнил Z)."

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