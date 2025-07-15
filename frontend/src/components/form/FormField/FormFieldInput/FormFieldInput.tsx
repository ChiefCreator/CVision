import FormField from "../FormField";
import EditInput from "@/components/input/EditInput/EditInput";

import type { FormFieldProps } from "../FormField";
import type { EditInputProps } from "@/components/input/EditInput/EditInput";
import React from "react";

interface FormFieldEditInputProps extends EditInputProps, Omit<FormFieldProps, "children"> {}

export default React.memo(function FormFieldEditInput({ className, label, errorMessage, ...inputProps }: FormFieldEditInputProps) {
  return (
    <FormField className={className} label={label} errorMessage={errorMessage}>
      <EditInput {...inputProps} />
    </FormField>
  );
})