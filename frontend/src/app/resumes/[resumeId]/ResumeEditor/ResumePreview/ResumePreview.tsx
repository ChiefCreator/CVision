import React, { useMemo } from "react";
import { usePdfDownloader } from "@/api/document/hooks/usePdfDownloader";

import Document from "@/components/document/Document/Document";

import type { BaseComponent } from "@/types/rootTypes";
import type { Resume } from "@/types/resumeTypes/resume";
import type { ChangeResumeField } from "@/types/resumeTypes/resumeUpdateFunctions";
import type { ResumeTemplateRendererProps } from "@/components/document/TemplateRenderer/TemplateRenderer";

import styles from "./ResumePreview.module.scss";
import clsx from "clsx";

interface ResumePreviewProps extends BaseComponent {
  resume?: Resume;
  changeField: ChangeResumeField;
  isGetResumeLoading: boolean;
}

export default React.memo(function ResumePreview({ className, resume }: ResumePreviewProps) {
  const { downloadPdf } = usePdfDownloader();

  const handleDownload = () => {
    downloadPdf("resume", resume!.id);
  }

  const resumeTemplateConfig = useMemo<ResumeTemplateRendererProps>(() => ({
    type: "resume",
    data: resume!,
    template: "classic"
  }), [resume]);

  if (!resume) return;

  return (
    <div className={clsx(styles.preview, className)}>
      <header className={styles.previewHead}>
        <button type="button" onClick={handleDownload}>
          To PDF
        </button>
      </header>

      <div className={styles.previewBody}>
        <Document
          type="preview"
          className={styles.document}
          template={resumeTemplateConfig}
        />
      </div>

      <footer className={styles.previewFoot}>

      </footer>
    </div>
  );
})