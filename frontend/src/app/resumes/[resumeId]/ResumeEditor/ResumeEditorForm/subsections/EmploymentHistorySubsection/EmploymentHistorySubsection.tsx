import React, { useState } from "react";
import { useFieldChange } from "@/api/resume/hooks";

import { transformStringDatesToRangeFormat } from "@/utils/dateUtils";

import Subsection from "../../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";

import type { EmploymentHistory, ResumeSectionChangeObj, ChangeResumeField } from "@/types/resumeTypes"
import type { SubsectionProps } from "../../Subsection/Subsection";

import styles from "./EmploymentHistorySubsection.module.scss";

interface EmploymentHistorySubsectionProps extends EmploymentHistory, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function EmploymentHistorySubsection({ id, subsectionName, sectionId, sectionName, jobTitle, employer, startDate, endDate, city, description, checkIsOpen, onToggle, onChange }: EmploymentHistorySubsectionProps) {
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<EmploymentHistory> = {
    jobTitle: useFieldChange(onChange, `${rootPath}.jobTitle`),
    employer: useFieldChange(onChange, `${rootPath}.employer`),
    startDate: useFieldChange(onChange, `${rootPath}.startDate`),
    endDate: useFieldChange(onChange, `${rootPath}.endDate`),
    city: useFieldChange(onChange, `${rootPath}.city`),
    description: useFieldChange(onChange, `${rootPath}.description`),
  }

  const [isFirstInputFocused, setIsFirstInputFocused] = useState(false);

  const changeOnClick = () => {
    onToggle(sectionId, id, true);
    setIsFirstInputFocused(true);
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
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
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
        <FormGroupCell gridArea="3 / 1 / 4 / 3">
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