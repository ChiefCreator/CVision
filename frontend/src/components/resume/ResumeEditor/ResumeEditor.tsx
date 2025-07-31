"use client"

import { ResumeIdProvider } from "@/hooks/resume/useResumeId";
import { DocumentPageProvider } from "@/hooks/document/useDocumentPage";

import ResumeEditorForm from "../ResumeEditorForm/ResumeEditorForm";
import ResumePreview from "../ResumePreview/ResumePreview";

import styles from "./ResumeEditor.module.scss";
import { ResumeProvider } from "@/hooks/resume/useResume";

interface ResumeEditorProps {
  resumeId: string;
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  return (
    <ResumeIdProvider id={resumeId}>
      <ResumeProvider>
        <DocumentPageProvider>
          <div className={styles.editor}>
            <ResumeEditorForm className={styles.editorForm} />
    
            <ResumePreview className={styles.editorPreview} />
          </div>
        </DocumentPageProvider>
      </ResumeProvider>
    </ResumeIdProvider>
  );
}