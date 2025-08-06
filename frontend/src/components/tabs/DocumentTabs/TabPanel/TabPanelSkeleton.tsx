import DocumentCardListSkeleton from "@/components/document/DocumentCardList/DocumentCardListSkeleton";

import styles from "./../DocumentTabs.module.scss";

export default function TabPanelSkeleton() {
  return (
    <div className={styles.panel}>
      <DocumentCardListSkeleton />
    </div>
  );
}