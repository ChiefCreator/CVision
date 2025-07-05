import Skeleton from "react-loading-skeleton";
import styles from "./TextEditor.module.scss";

export default function TextEditorSkeleton() {
  return (
    <div className={styles.textEditor} style={{ height: "150px" }}>
      <Skeleton />
    </div>
  );
}