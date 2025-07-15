import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";

import type { ResumeSectionChangeObj, LinkSection } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";
import CourseSubsection from "../../subsections/CourseSubsection/CourseSubsection";

interface LinksProps {
  sectionData?: LinkSection;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onChange: ChangeResumeField;
}

const sectionName = "courses";
const subsectionName = "courseSubsection";

export default React.memo(function Courses({ sectionData, isOpen, onToggle, onChange }: LinksProps) {
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

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      {sectionData?.data.map(subsection => (
        <CourseSubsection
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