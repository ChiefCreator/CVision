import React from "react";
import { useFieldChange } from "@/api/resume/hooks";
import { useChange } from "../../Subsection/hooks/useChange";

import { transformStringDatesToRangeFormat } from "@/utils/dateUtils";

import Subsection from "../../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resumeTypes/resumeUpdateFunctions";
import type { CustomData } from "@/types/sectionTypes/sections";
import type { SubsectionProps } from "../../Subsection/Subsection";

import styles from "./../../Subsection/Subsection.module.scss";

interface CustomSubsectionProps extends CustomData, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function CustomSubsection({ id, subsectionName, sectionId, sectionName, title, startDate, endDate, city, description, checkIsOpen, onToggle, onChange }: CustomSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });
    
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<CustomData> = {
    title: useFieldChange(onChange, `${rootPath}.title`),
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
      title={title}
      subtitle={transformStringDatesToRangeFormat(startDate, endDate)}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
        <FormGroupCell>
          <FormFieldEditInput
            label="Название"
            
            value={title}
            placeholder={"Введите название"}
            onChange={changeObj.title}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
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
        <FormGroupCell>
          <FormFieldDateRange
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={changeObj.startDate}
            onChangeEndDate={changeObj.endDate}
          />
        </FormGroupCell>
        <FormGroupCell gridArea="3 / 1 / 4 / 3">
          <FormFieldTextEditor
            className={styles.textEditor}
            label="Описание"

            onChange={changeObj.description}
          >
            {description}
          </FormFieldTextEditor>
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})