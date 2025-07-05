import React from "react";

import FormFieldSkeleton from "../FormFieldSkeleton/FormFieldSkeleton";
import TextEditorSkeleton from "@/components/input/TextEditor/TextEditorSkeleton";

import { BaseComponent } from "@/types/rootTypes";

interface FormFieldTextEditorProps extends BaseComponent {};

export default function FormFieldTextEditorSkeleton({ className }: FormFieldTextEditorProps) {
  return (
    <FormFieldSkeleton className={className}>
      <TextEditorSkeleton />
    </FormFieldSkeleton>
  );
}