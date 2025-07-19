import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import ExtraCurricularActivitySubsection from "../../subsections/ExtraCurricularActivitySubsection/ExtraCurricularActivitySubsection";

import type { ExtraCurricularActivitySection } from "@/types/sectionTypes/sections";
import type { ChangeResumeField } from "@/types/resumeTypes/resumeUpdateFunctions";
import type { ResumeSectionChangeObj } from "@/types/resumeTypes/resumeUpdateFunctions";

interface ExtraCurricularActivitiesProps {
  sectionData: ExtraCurricularActivitySection;
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
      {sectionData.data.map(subsection => (
        <ExtraCurricularActivitySubsection
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