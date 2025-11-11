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
      title={subsection.data?.referentFullName}
      subtitle={subsection.data?.company}
    >
      {({ data, isFirstInputFocused, getDataFieldHandler, onToggleFirstInputFocus }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Полное имя работодателя"
              
              value={data?.referentFullName}
              placeholder={"Введите имя работодателя"}
              onChange={getDataFieldHandler("referentFullName")}
              isFocused={isFirstInputFocused}
              setIsFocused={onToggleFirstInputFocus}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Компания"
              
              value={data?.company}
              placeholder={"Введите компанию"}
              onChange={getDataFieldHandler("company")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Телефон"
              
              value={data?.phone}
              placeholder={"Введите телефон"}
              onChange={getDataFieldHandler("phone")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Эл. почта"
              
              value={data?.email}
              placeholder={"Введите эл. почту"}
              onChange={getDataFieldHandler("email")}
            />
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})