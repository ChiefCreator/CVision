import type { BaseComponent } from "@/types/rootTypes";

import styles from "./FormGroup.module.scss"
import clsx from "clsx";
import React from "react";

interface FormGroupProps extends BaseComponent {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  children: React.ReactNode;
}

export default React.memo(function FormGroup({ className, gridTemplateColumns, gridTemplateRows, children }: FormGroupProps) {
  return (
    <fieldset className={clsx(styles.formGroup, className)} style={{ gridTemplateRows, gridTemplateColumns }}>
      {children}
    </fieldset>
  );
})