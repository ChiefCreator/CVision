import React from "react";

import TitleEditor from "@/components/input/TitleEditor/TitleEditor";

import type { BaseComponent } from "@/types/rootTypes";

import styles from "./Section.module.scss";
import clsx from "clsx";
import { ResumeSectionName } from "@/types/resumeTypes";
import { ChevronDown } from "lucide-react";

interface SectionProps extends BaseComponent {
  title?: string;
  defaultTitle?: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;

  onToggle: (id?: ResumeSectionName) => void;
  onChange: (value: string) => void;
}

export default function Section({ className, title, description, defaultTitle, children, isOpen, onToggle, onChange }: SectionProps) {

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest(`.${styles.titleEditor}`)) return;

    onToggle();
  }

  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head} onClick={handleClick}>
        <TitleEditor
          className={styles.titleEditor}
          controlClassName={styles.titleEditorControl}
          value={title}
          defaultValue={defaultTitle}
  
          onChange={onChange}
        />

        <ChevronDown className={clsx(styles.arrow, { [styles.arrowOpen]: isOpen })} />
      </header>

      <div className={clsx(styles.body, { [styles.bodyOpen]: isOpen })}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            {description && <p className={styles.description}>{description}</p>}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}