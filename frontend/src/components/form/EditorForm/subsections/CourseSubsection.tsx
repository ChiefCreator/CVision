import React from "react";


import FormFieldDateRange from "@/components/form/FormField/FormFieldDateRange/FormFieldDateRange";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";

import { transformStringDatesToRangeFormat } from "@/utils/date/transformStringDatesToRangeFormat";
import { transformStringsToSlashFormat } from "@/utils/string/transformStringsToSlashFormat";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

export default React.memo(function CourseSubsection({ subsection }: DomainSubsectionProps<"resume", "courses">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={transformStringsToSlashFormat(subsection.data.title, subsection.data.institution)}
      subtitle={transformStringDatesToRangeFormat(subsection.data.startDate, subsection.data.endDate)}
    >
      {({ data, isFirstInputFocused, onToggleFirstInputFocus, getDataFieldHandler }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Название курса"
              
              value={data.title}
              placeholder={"Введите название курса"}
              onChange={getDataFieldHandler("title")}
              isFocused={isFirstInputFocused}
              setIsFocused={onToggleFirstInputFocus}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Учреждение"
              
              value={data.institution}
              placeholder={"Введите учреждение"}
              onChange={getDataFieldHandler("institution")}
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
        </FormGroup>
      )}
    </SubsectionForm>
  );
})