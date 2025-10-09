import { useFieldChange } from "@/api/resume/hooks";
import React from "react";

import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import Section from "../../Section/Section";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { ProfessionalSummary } from "@/types/resumeSection/sections";

import clsx from "clsx";
import styles from "./../../Section/Section.module.scss";

interface ProfessionalSummaryProps {
  sectionData: ProfessionalSummary;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
}

const sectionName = "professionalSummary";

export default React.memo(function ProfessionalSummary({ sectionData, isOpen, onToggle, onChange }: ProfessionalSummaryProps) {
  const changeObj: ResumeSectionChangeObj<ProfessionalSummary, "description"> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
    summary: useFieldChange(onChange, `${sectionName}.summary`),
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
            placeholder="Напишите краткое резюме о себе, своих навыках и опыте."

            onChange={changeObj.summary}
          >
            {sectionData?.summary}
          </FormFieldTextEditor>
        </FormGroupCell>
      </FormGroup>
    </Section>
  );
})