import { usePdfDownloader } from "@/api/document/hooks/usePdfDownloader";
import { useResume } from "@/hooks/resume/useResume";
import React, { useMemo, useRef } from "react";

import Button from "@/components/button/Button/Button";
import Document from "@/components/document/Document/Document";
import DocumentButtons from "@/components/document/DocumentButtons/DocumentButtons";
import LoadingStatus from "@/components/loading/LoadingStatus/LoadingStatus";

import type { ResumeTemplateRendererProps } from "@/components/document/TemplateRenderer/TemplateRenderer";
import { MenuItemData } from "@/types/menu/menu";
import type { BaseComponent } from "@/types/root";

import Container from "@/components/utils/Container/Container";
import clsx from "clsx";
import styles from "./ResumePreview.module.scss";

interface ResumePreviewProps extends BaseComponent {}

export default React.memo(function ResumePreview({ className }: ResumePreviewProps) {
  const { resumeDelayed: resume, isAllUpdating } = useResume();
  const { downloadPdf } = usePdfDownloader();

  const resumePreviewId = "resume-preview";
  const resumePreviewRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    downloadPdf("resume", resume!.id);
  }

  const resumeTemplateConfig = useMemo<ResumeTemplateRendererProps>(() => ({
    type: "resume",
    data: resume!,
    template: "classic"
  }), [resume]);

  if (!resume) return;

  const menuData: MenuItemData = [
    {
      type: "control",
      id: "1",
      title: "PDF",
      onClick: handleDownload,
    },
  ];

  return (
    <div className={clsx(styles.preview, className)} id={resumePreviewId} ref={resumePreviewRef}>
      <Container className={styles.previewContainer}>
        <header className={styles.previewHead}>
          <Button
            type="buttonMenu"
            variant="secondary"
            menuData={menuData}
            menuPositionerProps={{ containerRef: resumePreviewRef }}
            menuPortalProps={{ containerId: resumePreviewId }}
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
      </Container>
    </div>
  );
})