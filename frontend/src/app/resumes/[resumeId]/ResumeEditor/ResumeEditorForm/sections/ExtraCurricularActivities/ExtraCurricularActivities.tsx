import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import ExtraCurricularActivitySubsection from "../../subsections/ExtraCurricularActivitySubsection/ExtraCurricularActivitySubsection";

import type { ResumeSectionChangeObj, ExtraCurricularActivitySection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

interface ExtraCurricularActivitiesProps {
  sectionData?: ExtraCurricularActivitySection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "extraCurricularActivities";
const subsectionName = "extraCurricularActivitySubsection";

export default React.memo(function ExtraCurricularActivities({ sectionData, isOpen, onToggle, onChange }: ExtraCurricularActivitiesProps) {
  const changeObj: ResumeSectionChangeObj<ExtraCurricularActivitySection, keyof Omit<ExtraCurricularActivitySection, "title">> = {
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
        <ExtraCurricularActivitySubsection
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