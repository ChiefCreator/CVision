import Skeleton from "react-loading-skeleton";
import styles from "./Button.module.scss";

export default function ButtonSkeleton() {
  return (
    <Skeleton className={styles.button} style={{ width: "150px", backgroundColor: "var(--base-color)", cursor: "initial" }} />
  );
}