import React from "react";

import { transformStringDatesToRangeFormat } from "@/utils/date/transformStringDatesToRangeFormat";

import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";

export default React.memo(function CustomSubsection({ subsection }: DomainSubsectionProps<"resume", "customSection">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={subsection.data.title}
      subtitle={transformStringDatesToRangeFormat(subsection.data.startDate, subsection.data.endDate)}
    >
      {({ data, isFirstInputFocused, onToggleFirstInputFocus, getDataFieldHandler }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Название"
              
              value={data.title}
              placeholder={"Введите название"}
              onChange={getDataFieldHandler("title")}
              isFocused={isFirstInputFocused}
              setIsFocused={onToggleFirstInputFocus}
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
          <FormGroupCell>
            <FormFieldDateRange
              className={styles.formGroupDateRange}
              startDate={data.startDate}
              endDate={data.endDate}
              onChangeStartDate={getDataFieldHandler("startDate")}
              onChangeEndDate={getDataFieldHandler("endDate")}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellCustomDescription}>
            <FormFieldTextEditor
              className={styles.textEditor}
              label="Описание"

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