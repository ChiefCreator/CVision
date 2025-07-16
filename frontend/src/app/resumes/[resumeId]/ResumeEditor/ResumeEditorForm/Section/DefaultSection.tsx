import React from "react";

import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import { ChevronDown } from "lucide-react";

import styles from "./Section.module.scss";
import clsx from "clsx";
import { useSection } from "./hooks/useSection";
import { DefaultSectionProps } from "./Section";

export default function DefaultSection({ className, id, sectionName, title, description, defaultTitle, children, additionalContent, checkIsOpen, onToggle, onChange }: DefaultSectionProps) {
  const { isOpen, handleClickHead } = useSection(id!, checkIsOpen, onToggle);

  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head} onClick={handleClickHead}>
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
            {additionalContent && <div className={styles.additionalContent}>{additionalContent}</div>}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}