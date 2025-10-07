import { useFieldChange } from "@/api/resume/hooks";
import React from "react";
import { useChange } from "../Subsection/hooks/useChange";

import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldSliderSelect from "@/components/form/FormField/FormFieldSliderSelect/FormFieldSliderSelect";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import SliderSelectSkill from "@/components/select/SliderSelect/SliderSelectSkill/SliderSelectSkill";
import Subsection from "../Subsection/Subsection";

import { skills } from "@/constants/root/skills";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { Skill } from "@/types/resumeSubsection/subsections";
import type { SubsectionProps } from "../Subsection/Subsection";

import styles from "@/components/resume/ResumeEditorForm/Subsection/Subsection.module.scss";
import sliderStyles from "@/components/select/SliderSelect/SliderSelectSkill/SliderSelectSkill.module.scss";

interface SkillSubsectionProps extends Skill, Omit<SubsectionProps, "children" | "defaultTitle" | "subTitle" | "title" | "onClickChange"> {
  isShowLevel?: boolean;

  onChange: ChangeResumeField;
}

export default React.memo(function SkillSubsection({ id, subsectionName, sectionId, sectionName, isShowLevel, title, level, checkIsOpen, onToggle, onChange }: SkillSubsectionProps) {
  const { isFirstInputFocused, setIsFirstInputFocused, changeOnClick } = useChange({ id, sectionId, onToggle });

  const levelLabel = skills.find(item => item.value === level)?.label;
  
  const rootPath = `${sectionName}.data[${id}]`;
  const changeObj: ResumeSectionChangeObj<Skill> = {
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
      subtitle={isShowLevel ? undefined : levelLabel}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup}>
        <FormGroupCell>
          <FormFieldEditInput
            label="Навык"
            
            value={title}
            placeholder={"Введите навык"}
            onChange={changeObj.title}
            isFocused={isFirstInputFocused}
            setIsFocused={setIsFirstInputFocused}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldSliderSelect
            label="Уровень"
            themeClassName={sliderStyles.sliderTheme}
            selectedValue={level}
            isDisabled={!isShowLevel}
            selectedLabel={levelLabel}
          >
            <SliderSelectSkill
              selectedValue={level}
              data={skills}
              isDisabled={!isShowLevel}
              onSelect={changeObj.level}
            />
          </FormFieldSliderSelect>
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})