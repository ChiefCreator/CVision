"use client"

import React from 'react';
import { useDocumentEditorContext } from "../../hooks/useDocumentEditorContext";

import ResumeForm from "../../components/forms/ResumeForm/ResumeForm";

import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { BaseComponent } from "@/types/root";

import { useDocumentTypeName } from "@/api/document/hooks/useGetDocument";
import EditorFormSkeleton from "@/components/form/EditorForm/EditorFormSkeleton";
import clsx from "clsx";
import styles from "./FormWrapper.module.scss";

export interface FormProps extends BaseComponent {};

type FormComponentType = React.ComponentType<FormProps>;

const formsMap: Record<DocumentTypeName, FormComponentType | null> = {
  resume: ResumeForm,
  coverLetter: null,
};

export default function FormWrapper({ className }: BaseComponent) {
  const { id, isGetLoading, isGetError } = useDocumentEditorContext();
  const typeName = useDocumentTypeName(id);

  const Form = typeName ? formsMap[typeName] : null;

  const getFormContent = () => {
    if (isGetLoading) {
      return <EditorFormSkeleton />
    }

    if (isGetError) {
      return <span className={styles.notFoundForm}>Формы для {typeName} не существует.</span>;
    }

    if (!Form) return null;

    return <Form />;
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      {getFormContent()}
    </div>
  )
};