import React from "react";

import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import AddSubsectionButton from "./AddSubsectionButton/AddSubsectionButton";
import { ChevronDown } from "lucide-react";

import styles from "./Section.module.scss";
import clsx from "clsx";
import { v4 } from "uuid";
import { useAddSubsection } from "@/api/resume/hooks";
import { ResumeListSectionName } from "@/types/resumeTypes";
import { SubsectionSectionProps } from "./Section";
import { useSection } from "./hooks/useSection";
import { useResumeId } from "../../context/ResumeIdContext";

export default function SubsectionSection({ className, id, sectionName, subsectionName, title, description, defaultTitle, children, checkIsOpen, onToggle, onChange }: SubsectionSectionProps) {
  const { isOpen, handleClickHead } = useSection(id!, checkIsOpen, onToggle);
  const resumeId = useResumeId();
  const { mutate } = useAddSubsection(resumeId, id!, sectionName as ResumeListSectionName, subsectionName);

  const addSubsection = async () => {
    const subsectionId = v4();
    
    mutate({ subsectionId });
    onToggle(id!, subsectionId);
  }

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

            <div className={styles.subsectionList}>{children}</div>

            <AddSubsectionButton className={styles.addSubsectionButton} onClick={addSubsection} />
          </div>
        </div>
      </div>
    </div>
  );
}