import React from "react";
import { useFieldChange } from "@/api/resume/hooks";
import { useChange } from "../../Subsection/hooks/useChange";

import Subsection from "../../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import EditSelect from "@/components/select/EditSelect/EditSelect";
import FormField from "@/components/form/FormField/FormField";

import { languages } from "@/constants/languages";

import type { ResumeSectionChangeObj, ChangeResumeField, Language } from "@/types/resumeTypes"
import type { SubsectionProps } from "../../Subsection/Subsection";

import styles from "./LanguageSubsection.module.scss";
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
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
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
            <EditSelect
              selectedValue={level}
              data={languages}
              onChange={changeObj.level}
            />
          </FormField>
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})