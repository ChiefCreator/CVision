"use client"

import { useResumeAutoUpdate } from "@/api/resume/hooks";
import { ResumeIdContext } from "./context/ResumeIdContext";

import ResumeEditorForm from "./ResumeEditorForm/ResumeEditorForm";

import styles from "./ResumeEditor.module.scss";
import ResumePreview from "./ResumePreview/ResumePreview";

interface ResumeEditorProps {
  resumeId: string;
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { resume, changeField, isGetResumeLoading } = useResumeAutoUpdate(resumeId, 800);

  return (
    <ResumeIdContext.Provider value={resumeId}>
      <div className={styles.editor}>
        <ResumeEditorForm className={styles.editorForm} resume={resume} changeField={changeField} isGetResumeLoading={isGetResumeLoading} />

        <ResumePreview className={styles.editorPreview} resume={resume} changeField={changeField} isGetResumeLoading={isGetResumeLoading} />
      </div>
    </ResumeIdContext.Provider>
  );
}