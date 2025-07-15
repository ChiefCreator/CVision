import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";

import type { ProfessionalSummary, ResumeSectionChangeObj } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

import styles from "./ProfessionalSummary.module.scss";

interface ProfessionalSummaryProps {
  sectionData?: ProfessionalSummary;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
}

const sectionName = "professionalSummary";

export default React.memo(function ProfessionalSummary({ sectionData, isOpen, onToggle, onChange }: ProfessionalSummaryProps) {
  const changeObj: ResumeSectionChangeObj<ProfessionalSummary> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
    summary: useFieldChange(onChange, `${sectionName}.summary`),
  }

  return (
    <Section
      id={sectionData?.id}
      sectionName={sectionName}
      title={sectionData?.title}
      defaultTitle={sectionData?.defaultTitle}
      description="Напишите 2-4 коротких, энергичных предложения о том, какой вы замечательный. Упомяните о своей роли и о том, что вы сделали. Каковы были ваши главные достижения? Опишите свою мотивацию и перечислите свои навыки."
      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="12fr">
        <FormGroupCell>
          <FormFieldTextEditor
            className={styles.textEditor}

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