import EditableTitle from "../EditableTitle/EditableTitle"
import styles from "./CVBuilder.module.scss";

import CVFormBuilder from "../CVFormBuilder.jsx/CVFormBuilder";
import CVBuilderPreview from "../CVBuilderPreview/CVBuilderPreview";
import { useResumeContext } from "../../context/ResumeContext";

export default function CVBuilder({ resumeId }) {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === resumeId);

  function handleEditableTitleChange(value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_FIELD",
      id: resumesDataState?.resumes[0]?.id,
      value: value,
      key: "title",
      path: ["title"],
      dbPath: "users/userId/resumes/resume#1"
    })
  }

  return (
    <div className={styles.cvBuilder}>
      <div className={styles.cvBuilderContainer}>
        <div className={styles.cvBuilderInfo}>
          <div className={styles.cvBuilderTitleWrapper}>
            <EditableTitle
              fontSize={27}
              onChangeCallback={(value) => handleEditableTitleChange(value)}
            >
              {resumesDataState?.resumes[0]?.title}
            </EditableTitle>
          </div>
          <CVFormBuilder resumeId="resume#1" />
        </div>
        <CVBuilderPreview resumeData={resumeData} isResumeDataLoaded={isResumeDataLoaded} />
      </div>
    </div>
  )
}