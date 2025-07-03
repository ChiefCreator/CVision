import FormField from "../FormField";
import EditInput from "@/components/input/EditInput/EditInput";

import type { FormFieldProps } from "../FormField";
import type { EditInputProps } from "@/components/input/EditInput/EditInput";
import React from "react";

interface FormFieldEditInputProps extends EditInputProps, Omit<FormFieldProps, "children"> {}

export default React.memo(function FormFieldEditInput({ className, label, errorMessage, value, placeholder, onChange }: FormFieldEditInputProps) {
  return (
    <FormField className={className} label={label} errorMessage={errorMessage}>
      <EditInput value={value} placeholder={placeholder} onChange={onChange} />
    </FormField>
  );
})