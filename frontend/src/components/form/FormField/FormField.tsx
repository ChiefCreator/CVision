import React from "react";

import type { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./FormField.module.scss";

export interface FormFieldProps extends BaseComponent {
  label?: string | React.ReactElement;
  labelClassName?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export default function FormField({ className, label, labelClassName, errorMessage, children }: FormFieldProps) {
  return (
    <div className={clsx(styles.formField, className)}>
      {label && (
        <header className={styles.formFieldHead}>
          {<label className={clsx(styles.formFieldLabel, labelClassName)}>{label}</label>}
        </header>
      )}

      <div className={styles.formFieldBody}>{children}</div>

      {errorMessage && <span className={styles.formFieldErrorDescription}>{errorMessage}</span>}
    </div>
  );
}