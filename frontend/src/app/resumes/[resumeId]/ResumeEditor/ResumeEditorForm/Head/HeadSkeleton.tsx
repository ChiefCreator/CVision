import TitleEditorSkeleton from "@/components/input/TitleEditor/TitleEditorSkeleton";

import styles from "./Head.module.scss";

export default function HeadSkeleton() {
  return (
    <header className={styles.head}>
      <TitleEditorSkeleton className={styles.headTitle} />
    </header>
  );
}