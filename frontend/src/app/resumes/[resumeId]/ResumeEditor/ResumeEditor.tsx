"use client"

import { useResumeAutoUpdate } from "@/api/resume/hooks";

import styles from "./ResumeEditor.module.scss";
import Head from "./sections/Head/Head";

interface ResumeEditorProps {
  resumeId: string;
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { resume, changeField } = useResumeAutoUpdate(resumeId, 800);

  return (
    <div className={styles.editor}>
      <div className={styles.editorContent}>
        <Head title={resume?.title} changeField={changeField} />
      </div>

      <div className={styles.editorPreview}></div>
    </div>
  );
}