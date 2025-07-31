import React from "react";
import { useFieldChange } from "@/api/resume/hooks";
import { useChange } from "../Subsection/hooks/useChange";

import Subsection from "../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { Reference } from "@/types/resumeSubsection/subsections";
import type { SubsectionProps } from "../Subsection/Subsection";

import styles from "@/components/resume/ResumeEditorForm/Subsection/Subsection.module.scss";

interface ReferenceSubsectionProps extends Reference, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  onChange: ChangeResumeField;
}

export default React.memo(function ReferenceSubsection({ id, subsectionName, sectionId, sectionName, referentFullName, company, phone, email, checkIsOpen, onToggle, onChange }: ReferenceSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });
    
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Reference> = {
    referentFullName: useFieldChange(onChange, `${rootPath}.referentFullName`),
    company: useFieldChange(onChange, `${rootPath}.company`),
    phone: useFieldChange(onChange, `${rootPath}.phone`),
    email: useFieldChange(onChange, `${rootPath}.email`),
  }

  return (
    <Subsection
      id={id}
      subsectionName={subsectionName}
      sectionId={sectionId}
      sectionName={sectionName}
      title={referentFullName}
      subtitle={company}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
        <FormGroupCell>
          <FormFieldEditInput
            label="Полное имя работодателя"
            
            value={referentFullName}
            placeholder={"Введите имя работодателя"}
            onChange={changeObj.referentFullName}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Компания"
            
            value={company}
            placeholder={"Введите компанию"}
            onChange={changeObj.company}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Телефон"
            
            value={phone}
            placeholder={"Введите телефон"}
            onChange={changeObj.phone}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Эл. почта"
            
            value={email}
            placeholder={"Введите эл. почту"}
            onChange={changeObj.email}
          />
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})