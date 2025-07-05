import Skeleton from "react-loading-skeleton";

import styles from "./EditInput.module.scss";

export default function EditInputSkeleton() {
  return (
    <div className={styles.input}>
      <Skeleton className={styles.inputContainer} />
    </div>
  );
}