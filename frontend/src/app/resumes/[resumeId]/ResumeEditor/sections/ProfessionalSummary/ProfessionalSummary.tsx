import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";

import type { ProfessionalSummary, ResumeSectionName, ResumeSectionChangeObj } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

import styles from "./ProfessionalSummary.module.scss";

interface ProfessionalSummaryProps {
  sectionData?: ProfessionalSummary;
  isOpen: boolean;

  onToggle: (id: ResumeSectionName) => void;
  onChange: ChangeResumeField;
}

const id = "professionalSummary";

export default React.memo(function ProfessionalSummary({ sectionData, isOpen, onToggle, onChange }: ProfessionalSummaryProps) {
  const changeObj: ResumeSectionChangeObj<ProfessionalSummary> = {
    title: useFieldChange(onChange, `${id}.title`),
    summary: useFieldChange(onChange, `${id}.summary`),
  }

  return (
    <Section
      title={sectionData?.title}
      defaultTitle={sectionData?.defaultTitle}
      description="Напишите 2-4 коротких, энергичных предложения о том, какой вы замечательный. Упомяните о своей роли и о том, что вы сделали. Каковы были ваши главные достижения? Опишите свою мотивацию и перечислите свои навыки."
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
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