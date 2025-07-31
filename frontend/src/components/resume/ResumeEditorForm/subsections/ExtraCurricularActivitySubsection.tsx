import React from "react";
import { useFieldChange } from "@/api/resume/hooks";
import { useChange } from "../Subsection/hooks/useChange";

import { transformStringDatesToRangeFormat } from "@/utils/date/transformStringDatesToRangeFormat";

import Subsection from "../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { ExtraCurricularActivity } from "@/types/resumeSubsection/subsections";
import type { SubsectionProps } from "../Subsection/Subsection";

import styles from "@/components/resume/ResumeEditorForm/Subsection/Subsection.module.scss";

interface ExtraCurricularActivitySubsectionProps extends ExtraCurricularActivity, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function ExtraCurricularActivitySubsection({ id, subsectionName, sectionId, sectionName, functionTitle, employer, startDate, endDate, city, description, checkIsOpen, onToggle, onChange }: ExtraCurricularActivitySubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });
    
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<ExtraCurricularActivity> = {
    functionTitle: useFieldChange(onChange, `${rootPath}.functionTitle`),
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
      title={functionTitle}
      subtitle={transformStringDatesToRangeFormat(startDate, endDate)}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
        <FormGroupCell>
          <FormFieldEditInput
            label="Занятость"
            
            value={functionTitle}
            placeholder={"Введите название занятости"}
            onChange={changeObj.functionTitle}
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