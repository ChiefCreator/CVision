"use client"

import { DocumentPageProvider } from "@/hooks/document/useDocumentPage";
import { ResumeIdProvider } from "@/hooks/resume/useResumeId";

import ResumeEditorForm from "../ResumeEditorForm/ResumeEditorForm";
import ResumePreview from "../ResumePreview/ResumePreview";

import BurgerMenu from "@/components/button/BurgerMenu/BurgerMenu";
import Sidebar from "@/components/menu/Sidebar/Sidebar";
import Portal from "@/components/position/Portal/Portal";
import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext";
import { ResumeProvider } from "@/hooks/resume/useResume";
import styles from "./ResumeEditor.module.scss";

interface ResumeEditorProps {
  resumeId: string;
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { isOpen, contentRef, triggerRef, toggle } = useAbsoluteSidebarContext();

  return (
    <ResumeIdProvider id={resumeId}>
      <ResumeProvider>
        <DocumentPageProvider>
          <div className={styles.editor}>
            <ResumeEditorForm className={styles.editorForm} />
    
            <ResumePreview className={styles.editorPreview} />
          </div>

          <Portal>
            <BurgerMenu className={styles.burgerMenu} isOpen={isOpen} ref={triggerRef} toggle={toggle} />
          </Portal>

          <Sidebar
            type="absolute"
            popoverClassName={styles.sidebarPopover}
            positioner={{
              contentRef,
				      triggerRef,
				      offsetY: 3,
				      anchorOrigin: { horizontal: "left", vertical: "bottom" },
				      transformOrigin: { horizontal: "left", vertical: "top" },
            }}
          />
        </DocumentPageProvider>
      </ResumeProvider>
    </ResumeIdProvider>
  );
}