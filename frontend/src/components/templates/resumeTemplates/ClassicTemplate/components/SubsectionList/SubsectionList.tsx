import styles from "./SubsectionList.module.scss";

interface SubsectionListProps {
  children: React.ReactNode;
}

export default function SubsectionList({ children }: SubsectionListProps) {
  return (
    <ul className={styles.list}>{children}</ul>
  );
}