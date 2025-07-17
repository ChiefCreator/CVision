import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";

import type { Hobbies, ResumeSectionChangeObj } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

import styles from "./Hobbies.module.scss";

interface HobbiesProps {
  sectionData?: Hobbies;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
}

const sectionName = "hobbies";

export default React.memo(function Hobbies({ sectionData, isOpen, onToggle, onChange }: HobbiesProps) {
  const changeObj: ResumeSectionChangeObj<Hobbies> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
    description: useFieldChange(onChange, `${sectionName}.description`),
  }

  return (
    <Section
      id={sectionData?.id}
      sectionName={sectionName}
      title={sectionData?.title}
      defaultTitle={sectionData?.defaultTitle}

      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="12fr">
        <FormGroupCell>
          <FormFieldTextEditor
            className={styles.textEditor}
            label="Хобби"

            placeholder="Например занятие спортом, чтение книг..."

            onChange={changeObj.description}
          >
            {sectionData?.description}
          </FormFieldTextEditor>
        </FormGroupCell>
      </FormGroup>
    </Section>
  );
})