import TitleEditorSkeleton from "@/components/input/TitleEditor/TitleEditorSkeleton";

import styles from "./Header.module.scss";

export default function HeaderSkeleton() {
  return (
    <header className={styles.head}>
      <TitleEditorSkeleton className={styles.headTitle} />
    </header>
  );
}