import FormField from "../FormField";

import FormInput, { FormInputProps } from "@/components/input/FormInput/FormInput";
import React from "react";
import type { FormFieldProps } from "../FormField";

import clsx from "clsx";
import styles from "./FormFieldFormInput.module.scss";

interface FormFieldFormInputProps extends FormInputProps, Omit<FormFieldProps, "children"> {}

export default React.memo(function FormFieldFormInput({ className, label, errorMessage, ...inputProps }: FormFieldFormInputProps) {
  return (
    <FormField
      className={clsx(styles.field, className)}
      label={label} errorMessage={errorMessage}
      labelClassName={styles.label}
    >
      <FormInput {...inputProps} />
    </FormField>
  );
})