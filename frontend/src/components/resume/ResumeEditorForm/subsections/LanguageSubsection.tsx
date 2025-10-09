import { useFieldChange } from "@/api/resume/hooks";
import React from "react";
import { useChange } from "../Subsection/hooks/useChange";

import FormField from "@/components/form/FormField/FormField";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import EditSelect from "@/components/select/EditSelect/EditSelect";
import Subsection from "../Subsection/Subsection";

import { languages } from "@/constants/root/languages";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { Language } from "@/types/resumeSubsection/subsections";
import type { SubsectionProps } from "../Subsection/Subsection";

import styles from "@/components/resume/ResumeEditorForm/Subsection/Subsection.module.scss";
import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";

interface LanguageSubsectionProps extends Language, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function LanguageSubsection({ id, subsectionName, sectionId, sectionName, title, level, checkIsOpen, onToggle, onChange }: LanguageSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });

  const levelLabel = languages.find(item => item.value === level)?.label;
  
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Language> = {
    title: useFieldChange(onChange, `${rootPath}.title`),
    level: useFieldChange(onChange, `${rootPath}.level`),
  }

  return (
    <Subsection
      id={id}
      subsectionName={subsectionName}
      sectionId={sectionId}
      sectionName={sectionName}
      title={title}
      subtitle={levelLabel}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup}>
        <FormGroupCell>
          <FormFieldEditInput
            label="Язык"
            
            value={title}
            placeholder={"Введите название языка"}
            onChange={changeObj.title}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormField label="Уровень">
            <ArrowNavigationProvider>
              <EditSelect
                selectedValue={level}
                defaultLabel="Выберите уровень языка"
                data={languages}
                onChange={changeObj.level}
              />
            </ArrowNavigationProvider>
          </FormField>
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})