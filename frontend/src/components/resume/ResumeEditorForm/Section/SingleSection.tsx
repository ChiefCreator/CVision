import React, { useMemo } from "react";
import { useSection } from "./hooks/useSection";
import { useResumeId } from "@/hooks/resume/useResumeId";
import { useDelete } from "./hooks/useDelete";

import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import { ChevronDown } from "lucide-react";

import { isDefaultResumeSection } from "@/utils/resumeSection/isResumeSection";

import type { SingleSectionProps } from "./Section";

import styles from "./Section.module.scss";
import clsx from "clsx";

export default function SingleSection({ className, id, sectionName, title, description, defaultTitle, children, additionalContent, checkIsOpen, onToggle, onChange }: SingleSectionProps) {
  const { isOpen, handleClickHead } = useSection(id!, checkIsOpen, onToggle);
  const deleteControlObj = useDelete({ sectionName , sectionId: id});

  const controls = useMemo(() => [...deleteControlObj], [deleteControlObj]);

  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head} onClick={handleClickHead}>
        <TitleEditor
          className={styles.titleEditor}
          controlClassName={styles.titleEditorControl}
          value={title}
          defaultValue={defaultTitle}
          controls={!isDefaultResumeSection(sectionName) ? controls : undefined}
  
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