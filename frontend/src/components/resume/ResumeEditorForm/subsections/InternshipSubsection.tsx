import { useFieldChange } from "@/api/resume/hooks";
import React from "react";
import { useChange } from "../Subsection/hooks/useChange";

import { transformStringDatesToRangeFormat } from "@/utils/date/transformStringDatesToRangeFormat";

import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import Subsection from "../Subsection/Subsection";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { Internship } from "@/types/resumeSubsection/subsections";
import type { SubsectionProps } from "../Subsection/Subsection";

import styles from "@/components/resume/ResumeEditorForm/Subsection/Subsection.module.scss";

interface InternshipSubsectionProps extends Internship, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function InternshipSubsection({ id, subsectionName, sectionId, sectionName, jobTitle, employer, startDate, endDate, city, description, checkIsOpen, onToggle, onChange }: InternshipSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });
    
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Internship> = {
    jobTitle: useFieldChange(onChange, `${rootPath}.jobTitle`),
    employer: useFieldChange(onChange, `${rootPath}.employer`),
    startDate: useFieldChange(onChange, `${rootPath}.startDate`),
    endDate: useFieldChange(onChange, `${rootPath}.endDate`),
    city: useFieldChange(onChange, `${rootPath}.city`),
    description: useFieldChange(onChange, `${rootPath}.description`),
  }

  return (
    <Subsection
      id={id}
      subsectionName={subsectionName}
      sectionId={sectionId}
      sectionName={sectionName}
      title={jobTitle}
      subtitle={transformStringDatesToRangeFormat(startDate, endDate)}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup}>
        <FormGroupCell>
          <FormFieldEditInput
            label="Профессия"
            
            value={jobTitle}
            placeholder={"Введите название профессии"}
            onChange={changeObj.jobTitle}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Работодатель"
            
            value={employer}
            placeholder={"Введите работодателя"}
            onChange={changeObj.employer}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldDateRange
            className={styles.formGroupDateRange}
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={changeObj.startDate}
            onChangeEndDate={changeObj.endDate}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Город"
            
            value={city}
            placeholder={"Введите название города"}
            onChange={changeObj.city}
          />
        </FormGroupCell>
        <FormGroupCell className={styles.formGroupCellInternshipDescription}>
          <FormFieldTextEditor
            className={styles.textEditor}
            label="Описание"
            placeholder="Напишите краткое описание о вашем опыте, задачах и достижениях."

            onChange={changeObj.description}
          >
            {description}
          </FormFieldTextEditor>
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})