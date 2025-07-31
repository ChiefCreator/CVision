import React, { useMemo } from "react";
import { useSection } from "./hooks/useSection";
import { useResumeId } from "@/hooks/resume/useResumeId";
import { useDelete } from "./hooks/useDelete";
import { useAddSubsection } from "@/api/resumeSubsection/hooks";

import { v4 } from "uuid";

import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import AddSubsectionButton from "./AddSubsectionButton/AddSubsectionButton";
import { ChevronDown } from "lucide-react";

import { isDefaultResumeSection } from "@/utils/resumeSection/isResumeSection";

import type { ListSectionProps } from "./Section";
import type { ResumeListSectionName } from "@/types/resumeSection/sectionName";

import styles from "./Section.module.scss";
import clsx from "clsx";
import { useResume } from "@/hooks/resume/useResume";

export default function ListSection({ className, id, sectionName, subsectionName, title, description, defaultTitle, children, additionalContent, addSubsectionDto = {}, checkIsOpen, onToggle, onChange }: ListSectionProps) {
  const resumeId = useResumeId();
  const { isOpen, handleClickHead } = useSection(id!, checkIsOpen, onToggle);
  const deleteControlObj = useDelete({ sectionName , sectionId: id});
  const { changeIsAllUpdating } = useResume();

  const { mutateAsync } = useAddSubsection(resumeId, id!, sectionName as ResumeListSectionName, subsectionName);

  const addSubsection = async () => {
    changeIsAllUpdating(true);
    const subsectionId = v4();
    
    onToggle(id!, subsectionId);
    await mutateAsync({ subsectionId, dto: addSubsectionDto });
    changeIsAllUpdating(false);
  }

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

            <div className={styles.subsectionList}>{children}</div>

            <AddSubsectionButton className={styles.addSubsectionButton} onClick={addSubsection} />
          </div>
        </div>
      </div>
    </div>
  );
}