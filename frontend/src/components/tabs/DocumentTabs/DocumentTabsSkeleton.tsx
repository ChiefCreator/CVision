import ButtonSkeleton from "@/components/button/Button/ButtonSkeleton";
import styles from "./DocumentTabs.module.scss";
import TabButtonSkeleton from "./TabButton/TabButtonSkeleton";
import TabPanelSkeleton from "./TabPanel/TabPanelSkeleton";

export default function DocumentTabsSkeleton() {
  return (
    <div className={styles.tabs}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.buttonsList}>
            <TabButtonSkeleton />
            <TabButtonSkeleton />
            <TabButtonSkeleton />
          </div>

          <div className={styles.controlsList}>
            <ButtonSkeleton className={styles.control} containerClassName={styles.controlSkeletonContainer} />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <TabPanelSkeleton />
      </div>
    </div>
  );
}