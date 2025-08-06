import DocumentCardSkeleton from "../DocumentCard/DocumentCardSkeleton";

import styles from "./DocumentCardList.module.scss";

export default function DocumentCardListSkeleton() {
  return (
    <div className={styles.list}>
      {Array.from({ length: 4 }).map((_, i) => (
        <DocumentCardSkeleton key={i} />
      ))}
    </div>
  );
}