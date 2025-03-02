import ResumeCanvas from "../ResumePreview/ResumePreview";

import styles from "./CVBuilderPreview.module.scss";

export default function CVBuilderPreview({ resumeData, isResumeDataLoaded }) {
  return (
    <div className={styles.cvBuilderPreview}>
      <div className={styles.cvBuilderPreviewContainer}>
        <ResumeCanvas resumeData={resumeData} isResumeDataLoaded={isResumeDataLoaded} />
      </div>
    </div>
  );
}