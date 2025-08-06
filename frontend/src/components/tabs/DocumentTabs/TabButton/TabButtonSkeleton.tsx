import styles from './TabButton.module.scss';
import Skeleton from 'react-loading-skeleton';

export default function TabButtonSkeleton() {
  return (
    <div className={styles.button} style={{ width: "150px" }}>
      <Skeleton />
    </div>
  );
}