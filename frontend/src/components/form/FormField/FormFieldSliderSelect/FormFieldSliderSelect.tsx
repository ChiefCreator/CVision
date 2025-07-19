import React from "react";

import FormField from "../FormField";

import type { FormFieldProps } from "../FormField";

import styles from "./FormFieldSliderSelect.module.scss";
import clsx from "clsx";
import { SkillLevel } from "@/types/sectionTypes/sections";

interface FormFieldSliderSelectProps extends FormFieldProps {
  selectedValue: SkillLevel
  selectedLabel?: string;
  themeClassName?: string;
  isDisabled?: boolean;
};

export default React.memo(function FormFieldSliderSelect({ className, label, errorMessage, children, selectedValue, selectedLabel, themeClassName, isDisabled }: FormFieldSliderSelectProps) {

  return (
    <FormField
      className={clsx(className)}
      label={<>{label} - <span className={clsx(styles.selectedLabel, themeClassName)} data-theme={isDisabled ? "disabled" : selectedValue}>{selectedLabel}</span></>}
      errorMessage={errorMessage}
    >
      {children}
    </FormField>
  );
})