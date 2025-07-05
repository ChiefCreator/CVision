import React from "react";

import Skeleton from "react-loading-skeleton";

import { BaseComponent } from "@/types/rootTypes";

import styles from "./../FormField.module.scss";
import clsx from "clsx";

export interface FormFieldProps extends BaseComponent {
  children: React.ReactNode;
}

export default function FormFieldSkeleton({ className, children }: FormFieldProps) {
  return (
    <div className={clsx(styles.formField, className)}>
      <header className={styles.formFieldHead}>
        <label className={styles.formFieldLabel} style={{ width: "70%" }}>
          <Skeleton />
        </label>
      </header>

      <div className={styles.formFieldBody}>{children}</div>
    </div>
  );
}