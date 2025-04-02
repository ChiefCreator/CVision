import { useState } from "react";

import EditableTitle from "../EditableTitle/EditableTitle"
import styles from "./CVBuilder.module.scss";

import CVFormBuilder from "../CVFormBuilder/CVFormBuilder";
import DocumentBuilderPreview from "../DocumentBuilderPreview/DocumentBuilderPreview";
import ModalSidebarTrigger from "../ModalSidebarTrigger/ModalSidebarTrigger";
import Sidebar from "../Sidebar/Sidebar";
import { useResumeContext } from "../../context/ResumeContext";

export default function CVBuilder({ resumeId }) {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === resumeId);

  const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);

  function handleResumeFieldChange(key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_FIELD",
      resumeId,
      value,
      key,
    })
  }

  return (
    <div className={styles.cvBuilder}>

      <ModalSidebarTrigger isSidebarModalOpen={isSidebarModalOpen} setIsSidebarModalOpen={setIsSidebarModalOpen} />
      <Sidebar defaultActiveItemId="none" isModal={true} isModalOpen={isSidebarModalOpen} isHeaderRendered={true} />

      <div className={styles.cvBuilderContainer}>
        <div className={styles.cvBuilderInfo}>
          <div className={styles.cvBuilderTitleWrapper}>
            <EditableTitle
              fontSize={27}
              onChangeCallback={(value) => handleResumeFieldChange("title", value)}
            >
              {resumesDataState?.resumes[0]?.title}
            </EditableTitle>
          </div>
          <CVFormBuilder resumeId={resumeId} />
        </div>
        <DocumentBuilderPreview data={resumeData} isDataLoaded={isResumeDataLoaded} changeDocumentField={handleResumeFieldChange} />
      </div>
    </div>
  )
}