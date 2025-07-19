import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import { transformStringDatesToRangeFormat } from "@/utils/dateUtils";
import { transformStringsToSlashFormat } from "@/utils/stringUtils";
import { useChange } from "../../Subsection/hooks/useChange";

import Subsection from "../../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resumeTypes/resumeUpdateFunctions";
import type { Course } from "@/types/sectionTypes/sections";
import type { SubsectionProps } from "../../Subsection/Subsection";

import styles from "./../../Subsection/Subsection.module.scss";

interface CourseSubsectionProps extends Course, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function CourseSubsection({ id, subsectionName, sectionId, sectionName, title, institution, startDate, endDate, checkIsOpen, onToggle, onChange }: CourseSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });

  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Course> = {
    title: useFieldChange(onChange, `${rootPath}.title`),
    institution: useFieldChange(onChange, `${rootPath}.institution`),
    startDate: useFieldChange(onChange, `${rootPath}.startDate`),
    endDate: useFieldChange(onChange, `${rootPath}.endDate`),
  }

  return (
    <Subsection
      id={id}
      subsectionName={subsectionName}
      sectionId={sectionId}
      sectionName={sectionName}
      title={transformStringsToSlashFormat(title, institution)}
      subtitle={transformStringDatesToRangeFormat(startDate, endDate)}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
        <FormGroupCell>
          <FormFieldEditInput
            label="Название курса"
            
            value={title}
            placeholder={"Введите название курса"}
            onChange={changeObj.title}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Учреждение"
            
            value={institution}
            placeholder={"Введите учреждение"}
            onChange={changeObj.institution}
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
      </FormGroup>
    </Subsection>
  );
})