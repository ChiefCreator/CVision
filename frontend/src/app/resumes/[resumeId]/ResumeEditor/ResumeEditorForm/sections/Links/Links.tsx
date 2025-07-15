import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import LinkSubsection from "../../subsections/LinkSubsection/LinkSubsection";
import Section from "../../Section/Section";

import type { ResumeSectionChangeObj, LinkSection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

interface LinksProps {
  sectionData?: LinkSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "links";
const subsectionName = "linkSubsection";

export default React.memo(function Links({ sectionData, isOpen, onToggle, onChange }: LinksProps) {
  const changeObj: ResumeSectionChangeObj<LinkSection, keyof Omit<LinkSection, "title">> = {
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
      description="Вы можете добавить ссылки на веб-сайты, которые хотите показать менеджерам по найму! Возможно, это будет ссылка на ваше портфолио, профиль в LinkedIn или личный веб-сайт."

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      {sectionData?.data.map(subsection => (
        <LinkSubsection
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