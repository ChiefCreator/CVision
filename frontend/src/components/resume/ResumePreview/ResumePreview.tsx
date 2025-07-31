import React, { useMemo } from "react";
import { usePdfDownloader } from "@/api/document/hooks/usePdfDownloader";
import { useResume } from "@/hooks/resume/useResume";

import Document from "@/components/document/Document/Document";
import DocumentButtons from "@/components/document/DocumentButtons/DocumentButtons";
import LoadingStatus from "@/components/loading/LoadingStatus/LoadingStatus";
import Button from "@/components/button/Button/Button";

import type { BaseComponent } from "@/types/root";
import type { ResumeTemplateRendererProps } from "@/components/document/TemplateRenderer/TemplateRenderer";
import type { DropdownMenuItemType } from "@/components/menu/DropdownMenu/DropdownMenu";

import styles from "./ResumePreview.module.scss";
import clsx from "clsx";

interface ResumePreviewProps extends BaseComponent {}

export default React.memo(function ResumePreview({ className }: ResumePreviewProps) {
  const { resumeDelayed: resume, isAllUpdating } = useResume();
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

  const menuData: DropdownMenuItemType[] = [
    {
      id: "1",
      label: "PDF",
      onClick: handleDownload,
    },
  ];

  return (
    <div className={clsx(styles.preview, className)}>
      <div className={styles.previewContainer}>
        <header className={styles.previewHead}>
          <Button
            type="buttonMenu"
            menuData={menuData}
            onClick={handleDownload}
          >Скачать</Button>
        </header>
  
        <div className={styles.previewBody}>
          <Document
            performance="preview"
            className={styles.document}
            template={resumeTemplateConfig}
          />
        </div>
  
        <footer className={styles.previewFoot}>
          <LoadingStatus
            className={styles.loadingStatus}
            status={isAllUpdating ? "loading" : "loaded"}
          />
  
          <DocumentButtons className={styles.buttons} />
        </footer>
      </div>
    </div>
  );
})