import HeadSkeleton from "./Head/HeadSkeleton";
import PersonalDetailsSkeleton from "./sections/PersonalDetails/PersonalDetailsSkeleton";
import ProfessionalSummarySkeleton from "./sections/ProfessionalSummary/ProfessionalSummarySkeleton";

import styles from "./ResumeEditorForm.module.scss";
import clsx from "clsx";

export default function ResumeEditorFormSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.form, className)}>
      <HeadSkeleton />

      <div className={styles.formSections}>
        <PersonalDetailsSkeleton />
        <ProfessionalSummarySkeleton />
      </div>
    </div>
  );
}