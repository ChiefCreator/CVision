import React from "react";
import { useFieldChange } from "@/api/resume/hooks";
import { useChange } from "../../Subsection/hooks/useChange";

import Subsection from "../../Subsection/Subsection";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldSliderSelect from "@/components/form/FormField/FormFieldSliderSelect/FormFieldSliderSelect";
import SliderSelectSkill from "@/components/select/SliderSelect/SliderSelectSkill/SliderSelectSkill";

import { skills } from "@/data/skills";

import type { ResumeSectionChangeObj, ChangeResumeField, Skill } from "@/types/resumeTypes"
import type { SubsectionProps } from "../../Subsection/Subsection";

import styles from "./SkillSubsection.module.scss";
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
      subtitle={levelLabel}
      checkIsOpen={checkIsOpen}
      onToggle={onToggle}
      onClickChange={changeOnClick}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
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
            isDisabled={isShowLevel}
            selectedLabel={levelLabel}
          >
            <SliderSelectSkill
              selectedValue={level}
              data={skills}
              isDisabled={isShowLevel}
              onSelect={changeObj.level}
            />
          </FormFieldSliderSelect>
        </FormGroupCell>
      </FormGroup>
    </Subsection>
  );
})