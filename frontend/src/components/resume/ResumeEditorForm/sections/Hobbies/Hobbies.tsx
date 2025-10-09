import { useFieldChange } from "@/api/resume/hooks";
import React from "react";

import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import Section from "../../Section/Section";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { Hobbies } from "@/types/resumeSection/sections";

import clsx from "clsx";
import styles from "./../../Section/Section.module.scss";

interface HobbiesProps {
  sectionData: Hobbies;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
}

const sectionName = "hobbies";

export default React.memo(function Hobbies({ sectionData, isOpen, onToggle, onChange }: HobbiesProps) {
  const changeObj: ResumeSectionChangeObj<Hobbies, "description"> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
    hobbyDescription: useFieldChange(onChange, `${sectionName}.hobbyDescription`),
  }

  return (
    <Section
      id={sectionData.id}
      sectionName={sectionName}
      title={sectionData.title}
      defaultTitle={sectionData.defaultTitle}
      description={sectionData.description}

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      <FormGroup className={clsx(styles.formGroup, styles.formGroupOneColumn)}>
        <FormGroupCell>
          <FormFieldTextEditor
            label="Хобби"

            placeholder="Например занятие спортом, чтение книг..."

            onChange={changeObj.hobbyDescription}
          >
            {sectionData.hobbyDescription}
          </FormFieldTextEditor>
        </FormGroupCell>
      </FormGroup>
    </Section>
  );
})