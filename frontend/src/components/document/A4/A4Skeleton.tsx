import Skeleton from "react-loading-skeleton";
import styles from "./A4.module.scss";

export default function A4Skeleton() {
  return (
    <Skeleton className={styles.a4} style={{ backgroundColor: "var(--base-color)" }} />
  );
}