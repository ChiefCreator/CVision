import React from "react";

import TitleEditorSkeleton from "@/components/input/TitleEditor/TitleEditorSkeleton";

import type { BaseComponent } from "@/types/rootTypes";

import styles from "./Section.module.scss";
import clsx from "clsx";

interface SectionProps extends BaseComponent {
  children: React.ReactNode;
}

export default function SectionSkeleton({ className, children }: SectionProps) {

  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head}>
        <TitleEditorSkeleton />
      </header>

      <div className={clsx(styles.body, styles.bodyOpen)}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}