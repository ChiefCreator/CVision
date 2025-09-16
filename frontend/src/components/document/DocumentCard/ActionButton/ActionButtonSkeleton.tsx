import styles from "./ActionButton.module.scss";
import Skeleton from "react-loading-skeleton";

export default function ActionButtonSkeleton() {
  return (
    <Skeleton className={styles.button} style={{ width: "100%", cursor: "initial" }} containerClassName={styles.skeletonContainer} />
  );
}