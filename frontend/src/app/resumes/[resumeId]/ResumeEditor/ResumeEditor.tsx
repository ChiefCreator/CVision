"use client"

import { useCallback, useEffect, useState } from "react";

import { useResumeAutoUpdate } from "@/api/resume/hooks";

import Head from "./Head/Head";
import PersonalDetails from "./sections/PersonalDetails/PersonalDetails";
import ProfessionalSummary from "./sections/ProfessionalSummary/ProfessionalSummary";

import styles from "./ResumeEditor.module.scss";
import { ResumeSectionName } from "@/types/resumeTypes";

interface ResumeEditorProps {
  resumeId: string;
}

const sectionNames: ResumeSectionName[] = ["personalDetails", "professionalSummary", "employmentHistory", "education", "links", "skills", "languages", "courses", "customSections"]

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

          <ProfessionalSummary
            sectionData={resume?.professionalSummary}
            onChange={changeField}
            isOpen={openSectionIds.includes("professionalSummary")}
            onToggle={toggleSection}
          />
        </div>
      </div>

      <div className={styles.editorPreview}></div>
    </div>
  );
}