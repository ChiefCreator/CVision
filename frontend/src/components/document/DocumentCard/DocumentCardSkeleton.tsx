import TitleEditorSkeleton from '@/components/input/TitleEditor/TitleEditorSkeleton';
import Skeleton from 'react-loading-skeleton';
import DocumentSkeleton from "../Document/DocumentSkeleton";
import ActionButtonSkeleton from "./ActionButton/ActionButtonSkeleton";

import clsx from "clsx";
import styles from "./DocumentCard.module.scss";

export default function DocumentCardSkeleton() {
  return (
    <div className={clsx(styles.card, styles.cardSkeleton)}>
      <header className={styles.headerMobile}>
        <div className={styles.titleWrapper}>
          <TitleEditorSkeleton />

          <Skeleton className={styles.updatedAt} style={{ width: "70%" }} />
        </div>

        <Skeleton className={styles.buttonActionsMenuSkeleton} />
      </header>

      <div className={styles.previewWrapper} style={{ cursor: "initial" }}>
        <DocumentSkeleton />
      </div>
    
      <div className={styles.info}>
        <div className={styles.header}>
          <TitleEditorSkeleton />

          <Skeleton className={styles.updatedAt} style={{ width: "70%" }} />
        </div>

        <div className={styles.actionButtonsList}>
          <ActionButtonSkeleton />
          <ActionButtonSkeleton />
          <ActionButtonSkeleton />
          <ActionButtonSkeleton />
        </div>
      </div>
    </div>
  );
}