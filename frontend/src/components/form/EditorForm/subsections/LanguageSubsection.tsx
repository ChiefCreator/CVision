import React from "react";

import FormField from "@/components/form/FormField/FormField";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import EditSelect from "@/components/select/EditSelect/EditSelect";

import { languages } from "@/constants/root/languages";

import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";
import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";

export default React.memo(function LanguageSubsection({ subsection }: DomainSubsectionProps<"resume", "languages">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={subsection.data?.title}
      subtitle={languages.find(l => l.value === subsection.data?.level)?.label}
    >
      {({ data, isFirstInputFocused, onToggleFirstInputFocus, getDataFieldHandler }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Язык"
              
              value={data?.title}
              placeholder={"Введите название языка"}
              onChange={getDataFieldHandler("title")}
              isFocused={isFirstInputFocused}
              setIsFocused={onToggleFirstInputFocus}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormField label="Уровень">
              <ArrowNavigationProvider>
                <EditSelect
                  selectedValue={data?.level}
                  defaultLabel="Выберите уровень языка"
                  data={languages}
                  onChange={getDataFieldHandler("level")}
                />
              </ArrowNavigationProvider>
            </FormField>
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})