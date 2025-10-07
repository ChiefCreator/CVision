"use client"

import { DocumentPageProvider } from "@/hooks/document/useDocumentPage";
import { ResumeIdProvider } from "@/hooks/resume/useResumeId";

import ResumeEditorForm from "../ResumeEditorForm/ResumeEditorForm";
import ResumePreview from "../ResumePreview/ResumePreview";

import BurgerMenu from "@/components/button/BurgerMenu/BurgerMenu";
import Header from "@/components/header/Header/Header";
import Sidebar from "@/components/menu/Sidebar/Sidebar";
import Portal from "@/components/position/Portal/Portal";
import { breakpoints } from "@/constants/breakpoints/breakpoints";
import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext";
import { ResumeProvider } from "@/hooks/resume/useResume";
import { maxWidth } from "@/utils/media/maxWidth";
import { useMediaQuery } from "react-responsive";
import styles from "./ResumeEditor.module.scss";

interface ResumeEditorProps {
  resumeId: string;
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { isOpen, triggerRef, contentRef, toggle } = useAbsoluteSidebarContext();
  const isMobile = useMediaQuery(maxWidth(breakpoints.mobileL))

  return (
    <ResumeIdProvider id={resumeId}>
      <ResumeProvider>
        <DocumentPageProvider>
          <Header className={styles.header} />

          <div className={styles.editor}>
            <ResumeEditorForm className={styles.editorForm} />
    
            <ResumePreview className={styles.editorPreview} />
          </div>

          {!isMobile && (
            <>
              <Portal>
                <BurgerMenu className={styles.burgerMenu} isOpen={isOpen} ref={triggerRef} toggle={toggle} />
              </Portal>

              <Sidebar
                type="absolute"
                popoverClassName={styles.sidebarPopover}
                positioner={{
				          offsetY: 3,
				          anchorOrigin: { horizontal: "left", vertical: "bottom" },
				          transformOrigin: { horizontal: "left", vertical: "top" },
                  isFixed: true,
                }}
              />
            </>
          )}

          {isMobile && (
            <Sidebar
              type="absolute"
              popoverClassName={styles.sidebarPopoverMobile}
              positioner={{
                triggerRef,
                contentRef,
				        offsetY: 3,
				        anchorOrigin: { horizontal: "right", vertical: "bottom" },
				        transformOrigin: { horizontal: "right", vertical: "top" },
                isFixed: true,
              }}
            />
          )}
        </DocumentPageProvider>
      </ResumeProvider>
    </ResumeIdProvider>
  );
}