import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import LanguageSubsection from "../../subsections/LanguageSubsection";

import type { LanguageSection } from "@/types/resumeSection/sections";
import type { ChangeResumeField } from "@/types/resume/resumeUpdateFunctions";
import type { ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import { sortByOrder } from "@/utils/subsection/sortByOrder";

interface LanguagesProps {
  sectionData: LanguageSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "languages";
const subsectionName = "languageSubsection";

export default React.memo(function Languages({ sectionData, isOpen, onToggle, onChange }: LanguagesProps) {
  const changeObj: ResumeSectionChangeObj<LanguageSection, keyof Omit<LanguageSection, "title">> = {
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
        <LanguageSubsection
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