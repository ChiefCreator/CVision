"use client"

import React from 'react';
import { useDocumentEditorContext } from "../../hooks/useDocumentEditorContext";

import ResumeForm from "../../components/forms/ResumeForm/ResumeForm";

import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./FormWrapper.module.scss";

export interface FormProps extends BaseComponent {};

type FormComponentType = React.ComponentType<FormProps>;

const formsMap: Record<DocumentTypeName, FormComponentType | null> = {
  resume: ResumeForm,
  coverLetter: null,
};

export default function FormWrapper({ className }: BaseComponent) {
	const { document, isGetLoading } = useDocumentEditorContext();

  if (isGetLoading) {
    return <div className={className}>loading..</div>;
  }

  const typeName = document?.type.name;
  
  const Form = typeName ? formsMap[typeName] : null;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {Form && <Form />}

      {!Form && <span className={styles.notFoundForm}>Формы для {typeName} не существует.</span>}
    </div>
  )
};