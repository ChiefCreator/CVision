import React from "react";

import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormFieldSliderSelect from "@/components/form/FormField/FormFieldSliderSelect/FormFieldSliderSelect";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import SliderSelectSkill from "@/components/select/SliderSelect/SliderSelectSkill/SliderSelectSkill";

import { skills } from "@/constants/root/skills";

import sliderStyles from "@/components/select/SliderSelect/SliderSelectSkill/SliderSelectSkill.module.scss";
import { DomainSubsectionProps } from "../compoundComponents/Subsection/Subsection";
import { SubsectionForm } from "../compoundComponents/Subsection/SubsectionForm";

import styles from "@/components/form/EditorForm/compoundComponents/Subsection/Subsection.module.scss";
import { SkillLevel } from "@/types/skill/skillLevel";

export default React.memo(function SkillSubsection({ subsection, isShowLevel = true }: DomainSubsectionProps<"resume", "skills">) {
  return (
    <SubsectionForm
      subsection={subsection}
      title={subsection.data?.title}
      subtitle={isShowLevel ? undefined : skills.find(s => s.value === subsection.data?.level)?.label}
    >
      {({ data, isFirstInputFocused, onToggleFirstInputFocus, getDataFieldHandler }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            <FormFieldEditInput
              label="Навык"
              
              value={data?.title}
              placeholder={"Введите навык"}
              onChange={getDataFieldHandler("title")}
              isFocused={isFirstInputFocused}
              setIsFocused={onToggleFirstInputFocus}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldSliderSelect
              label="Уровень"
              themeClassName={sliderStyles.sliderTheme}
              selectedValue={data?.level!}
              isDisabled={!isShowLevel}
              selectedLabel={skills.find(s => s.value === subsection.data?.level)?.label}
            >
              <SliderSelectSkill
                selectedValue={data?.level ?? SkillLevel.Expert}
                data={skills}
                isDisabled={!isShowLevel}
                onSelect={getDataFieldHandler("level")}
              />
            </FormFieldSliderSelect>
          </FormGroupCell>
        </FormGroup>
      )}
    </SubsectionForm>
  );
})