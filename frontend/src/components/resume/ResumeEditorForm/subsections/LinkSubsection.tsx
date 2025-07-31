import React from "react";
import { useFieldChange } from "@/api/resume/hooks";
import { useChange } from "../Subsection/hooks/useChange";

import Subsection from "../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { Link } from "@/types/resumeSubsection/subsections";
import type { SubsectionProps } from "../Subsection/Subsection";

import styles from "@/components/resume/ResumeEditorForm/Subsection/Subsection.module.scss";

interface LinkSubsectionProps extends Link, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function LinkSubsection({ id, subsectionName, sectionId, sectionName, label, url, checkIsOpen, onToggle, onChange }: LinkSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });
  
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Link> = {
    label: useFieldChange(onChange, `${rootPath}.label`),
    url: useFieldChange(onChange, `${rootPath}.url`),
  }

  return (
    <Subsection
      id={id}
      subsectionName={subsectionName}
      sectionId={sectionId}
      sectionName={sectionName}
      title={label}
      subtitle={url}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
        <FormGroupCell>
          <FormFieldEditInput
            label="Заголовок"
            
            value={label}
            placeholder={"Введите заголовок"}
            onChange={changeObj.label}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Ссылка"
            
            value={url}
            placeholder={"Введите ссылку"}
            onChange={changeObj.url}
          />
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})