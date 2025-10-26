import React from "react";

import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";

export default React.memo(function LinkSubsection({ subsection }: DomainSubsectionProps<"resume", "links">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={subsection.data.label}
      subtitle={subsection.data.url}
    >
      {({ data, isFirstInputFocused, setIsFirstInputFocused, changeField }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Заголовок"
              
              value={data.label}
              placeholder={"Введите заголовок"}
              onChange={v => changeField("label", v)}
              isFocused={isFirstInputFocused}
              setIsFocused={setIsFirstInputFocused}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Ссылка"
              
              value={data.url}
              placeholder={"Введите ссылку"}
              onChange={v => changeField("url", v)}
            />
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})