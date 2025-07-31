import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import SkillSubsection from "../../subsections/SkillSubsection";
import Toggle from "@/components/button/Toggle/Toggle";

import type { SkillSection } from "@/types/resumeSection/sections";
import { SkillLevel } from "@/types/skill/skillLevel";
import type { ChangeResumeField } from "@/types/resume/resumeUpdateFunctions";
import type { ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import { sortByOrder } from "@/utils/subsection/sortByOrder";

interface SkillsProps {
  sectionData: SkillSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "skills";
const subsectionName = "skillSubsection";

export default React.memo(function Skills({ sectionData, isOpen, onToggle, onChange }: SkillsProps) {
  const changeObj: ResumeSectionChangeObj<SkillSection, keyof Omit<SkillSection, "title" | "isShowLevel">> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
    isShowLevel: useFieldChange(onChange, `${sectionName}.isShowLevel`),
  }

  const additionalContent = (
    <Toggle
      isActive={sectionData?.isShowLevel}
      label={["Показать уровень навыков", "Скрыть уровнь навыков"]}
      onChange={changeObj.isShowLevel}
    />
  );

  return (
    <Section
      id={sectionData.id}
      sectionName={sectionName}
      subsectionName={subsectionName}
      type="list"
      title={sectionData.title}
      defaultTitle={sectionData.defaultTitle}
      description={sectionData.description}
      additionalContent={additionalContent}
      addSubsectionDto={{ level: SkillLevel.Expert }}

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      {sortByOrder(sectionData.data).map(subsection => (
        <SkillSubsection
          {...subsection}
          key={subsection.id}
          subsectionName={subsectionName}
          sectionId={sectionData.id}
          sectionName={sectionName}
          isShowLevel={sectionData?.isShowLevel}
  
          checkIsOpen={isOpen}
          onToggle={onToggle}
          onChange={onChange}
        />
      ))}
    </Section>
  );
})