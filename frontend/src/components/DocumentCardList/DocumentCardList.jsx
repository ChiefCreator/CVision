import styles from "./DocumentCardList.module.scss";

export default function DocumentCardList({ children }) {
  return (
    <div className={styles.list}>
      {children}
    </div>
  );
}