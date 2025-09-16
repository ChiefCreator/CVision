"use client"

import { Checkbox, CheckboxProps } from "@/components/input/Checkbox/Checkbox";
import FormField, { FormFieldProps } from "../FormField";

interface FormFieldCheckboxProps extends CheckboxProps, Omit<FormFieldProps, "children" | "label"> {}

export function FormFieldCheckbox({ className, errorMessage, ...checkboxProps }: FormFieldCheckboxProps) {
	return (
		<FormField
      className={className}
      errorMessage={errorMessage}
    >
      <Checkbox {...checkboxProps} />
    </FormField>
	)
}
