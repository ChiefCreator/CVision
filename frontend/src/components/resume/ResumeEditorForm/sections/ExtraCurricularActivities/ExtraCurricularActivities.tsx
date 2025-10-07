import { useFieldChange } from "@/api/resume/hooks";
import React from "react";

import Section from "../../Section/Section";
import ExtraCurricularActivitySubsection from "../../subsections/ExtraCurricularActivitySubsection";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { ExtraCurricularActivitySection } from "@/types/resumeSection/sections";
import { sortByOrder } from "@/utils/subsection/sortByOrder";

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
      {sortByOrder(sectionData.data).map(subsection => (
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