import styles from "./AddSectionItem.module.scss";
import Skeleton from "react-loading-skeleton";

export default function AddSectionItemSkeleton() {
  return (
    <div className={styles.button}>
      <Skeleton containerClassName={styles.skeletonContainer} />
    </div>
  );
}