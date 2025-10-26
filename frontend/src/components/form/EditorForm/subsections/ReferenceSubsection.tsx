import React from "react";

import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";

export default React.memo(function ReferenceSubsection({ subsection }: DomainSubsectionProps<"resume", "references">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={subsection.data.referentFullName}
      subtitle={subsection.data.company}
    >
      {({ data, isFirstInputFocused, setIsFirstInputFocused, changeField }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Полное имя работодателя"
              
              value={data.referentFullName}
              placeholder={"Введите имя работодателя"}
              onChange={v => changeField("referentFullName", v)}
              isFocused={isFirstInputFocused}
              setIsFocused={setIsFirstInputFocused}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Компания"
              
              value={data.company}
              placeholder={"Введите компанию"}
              onChange={v => changeField("company", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Телефон"
              
              value={data.phone}
              placeholder={"Введите телефон"}
              onChange={v => changeField("phone", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Эл. почта"
              
              value={data.email}
              placeholder={"Введите эл. почту"}
              onChange={v => changeField("email", v)}
            />
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})