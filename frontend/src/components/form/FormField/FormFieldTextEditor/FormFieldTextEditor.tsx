import React from "react";

import FormField from "../FormField";
import TextEditor from "@/components/input/TextEditor/TextEditor";

import type { FormFieldProps } from "../FormField";
import type { TextEditorProps } from "@/components/input/TextEditor/TextEditor";

interface FormFieldTextEditorProps extends TextEditorProps, Omit<FormFieldProps, "children"> {};

export default React.memo(function FormFieldTextEditor({ className, label, errorMessage, children, placeholder, onChange }: FormFieldTextEditorProps) {
  return (
    <FormField className={className} label={label} errorMessage={errorMessage}>
      <TextEditor placeholder={placeholder} onChange={onChange}>{children}</TextEditor>
    </FormField>
  );
})