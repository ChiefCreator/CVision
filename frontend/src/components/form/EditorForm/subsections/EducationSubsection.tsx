import React from "react";

import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";

import { transformStringDatesToRangeFormat } from "@/utils/date/transformStringDatesToRangeFormat";
import { transformStringsToSlashFormat } from "@/utils/string/transformStringsToSlashFormat";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";

export default React.memo(function EducationSubsection({ subsection }: DomainSubsectionProps<"resume", "education">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={transformStringsToSlashFormat(subsection.data.school, subsection.data.degree)}
      subtitle={transformStringDatesToRangeFormat(subsection.data.startDate, subsection.data.endDate)}
    >
      {({ data, isFirstInputFocused, onToggleFirstInputFocus, getDataFieldHandler }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Учреждение образования"
              
              value={data.school}
              placeholder={"Введите название учреждения образования"}
              onChange={getDataFieldHandler("school")}
              isFocused={isFirstInputFocused}
              setIsFocused={onToggleFirstInputFocus}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Степень"
              
              value={data.degree}
              placeholder={"Введите степень"}
              onChange={getDataFieldHandler("degree")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldDateRange
              className={styles.formGroupDateRange}
              startDate={data.startDate}
              endDate={data.endDate}
              onChangeStartDate={getDataFieldHandler("startDate")}
              onChangeEndDate={getDataFieldHandler("endDate")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Город"
              
              value={data.city}
              placeholder={"Введите название города"}
              onChange={getDataFieldHandler("city")}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellEducationDescription}>
            <FormFieldTextEditor
              className={styles.textEditor}
              label="Описание"
              placeholder="Напишите краткое описание о вашем опыте, задачах и достижениях."

              onChange={getDataFieldHandler("description")}
            >
              {data.description}
            </FormFieldTextEditor>
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})