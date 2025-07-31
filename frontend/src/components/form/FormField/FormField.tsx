import React from "react";

import type { BaseComponent } from "@/types/root";

import styles from "./FormField.module.scss"
import clsx from "clsx";

export interface FormFieldProps extends BaseComponent {
  label?: string | React.ReactElement;
  errorMessage?: string;
  children: React.ReactNode;
}

export default function FormField({ className, label, errorMessage, children }: FormFieldProps) {
  return (
    <div className={clsx(styles.formField, className)}>
      <header className={styles.formFieldHead}>
        {label && <label className={styles.formFieldLabel}>{label}</label>}
      </header>

      <div className={styles.formFieldBody}>{children}</div>

      {errorMessage && <span className={styles.formFieldErrorDescription}>{errorMessage}</span>}
    </div>
  );
}