import Skeleton from "react-loading-skeleton";
import styles from "./AddSection.module.scss";
import AddSectionItemSkeleton from "./AddSectionItem/AddSectionItemSkeleton";

export default function AddSectionSkeleton() {
  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <h2 className={styles.title}><Skeleton /></h2>
      </header>

      <div className={styles.list}>
        {Array.from({ length: 6 }).map((_, i) => (
          <AddSectionItemSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}