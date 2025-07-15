import React, { useState } from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Subsection from "../../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";

import type { ResumeSectionChangeObj, ChangeResumeField, Link } from "@/types/resumeTypes"
import type { SubsectionProps } from "../../Subsection/Subsection";

import styles from "./LinkSubsection.module.scss";

interface LinkSubsectionProps extends Link, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function LinkSubsection({ id, subsectionName, sectionId, sectionName, label, url, checkIsOpen, onToggle, onChange }: LinkSubsectionProps) {
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Link> = {
    label: useFieldChange(onChange, `${rootPath}.label`),
    url: useFieldChange(onChange, `${rootPath}.url`),
  }

  const [isFirstInputFocused, setIsFirstInputFocused] = useState(false);

  const changeOnClick = () => {
    onToggle(sectionId, id, true);
    setIsFirstInputFocused(true);
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