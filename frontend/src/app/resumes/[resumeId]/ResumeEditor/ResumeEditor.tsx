"use client"

import { useResumeAutoUpdate } from "@/api/resume/hooks";

import Head from "./Head/Head";
import PersonalDetails from "./sections/PersonalDetails/PersonalDetails";

import styles from "./ResumeEditor.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Resume, ResumeSectionName } from "@/types/resumeTypes";

interface ResumeEditorProps {
  resumeId: string;
}

const sectionNames: ResumeSectionName[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "links", "skills", "languages", "courses", "customSections"]

const getResumeSectionNames = (resume?: Resume) => {
  if (!resume) return [];

  const sectionNames: ResumeSectionName[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "links", "skills", "languages", "courses", "customSections"];

  return Object.keys(resume).filter(key => (sectionNames.includes(key as ResumeSectionName) && key)) as ResumeSectionName[];
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { resume, changeField } = useResumeAutoUpdate(resumeId, 800);
  const [openSectionIds, setOpenSectionIds] = useState<ResumeSectionName[]>(sectionNames);

  const toggleSection = useCallback((sectionId: ResumeSectionName) => {
    if (openSectionIds.includes(sectionId)) {
      setOpenSectionIds(prev => prev.filter(id => id !== sectionId));
    } else {
      setOpenSectionIds(prev => [...prev, sectionId]);
    }
  }, [openSectionIds, setOpenSectionIds]);

  useEffect(() => {
    setOpenSectionIds(getResumeSectionNames(resume));
  }, [resume, setOpenSectionIds])

  return (
    <div className={styles.editor}>
      <div className={styles.editorContent}>
        <Head title={resume?.title} changeField={changeField} />

        <div className={styles.editorSections}>
          <PersonalDetails
            sectionData={resume?.personalDetails}
            onChange={changeField}
            isOpen={openSectionIds.includes("personalDetails")}
            onToggle={toggleSection}
          />
        </div>
      </div>

      <div className={styles.editorPreview}></div>
    </div>
  );
}