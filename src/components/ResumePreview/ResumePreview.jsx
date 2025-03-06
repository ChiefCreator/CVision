import styles from "./ResumePreview.module.scss";

import Template_1 from "./templates/Template_1/Template_1";

export default function ResumePreview({ resumeData, isResumeDataLoaded }) {

  if (isResumeDataLoaded) {

    return (
      <div className={styles.resumePreview}>
        <Template_1 resumeData={resumeData} />
      </div>
    );
  }
}