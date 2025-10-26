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
      {({ data, isFirstInputFocused, setIsFirstInputFocused, changeField }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Название"
              
              value={data.title}
              placeholder={"Введите название"}
              onChange={v => changeField("title", v)}
              isFocused={isFirstInputFocused}
              setIsFocused={setIsFirstInputFocused}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Город"
              
              value={data.city}
              placeholder={"Введите название города"}
              onChange={v => changeField("city", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldDateRange
              className={styles.formGroupDateRange}
              startDate={data.startDate}
              endDate={data.endDate}
              onChangeStartDate={v => changeField("startDate", v)}
              onChangeEndDate={v => changeField("endDate", v)}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellCustomDescription}>
            <FormFieldTextEditor
              className={styles.textEditor}
              label="Описание"

              onChange={v => changeField("description", v)}
            >
              {data.description}
            </FormFieldTextEditor>
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})