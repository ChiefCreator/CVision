import styles from './Tabs.module.scss';

export default function TabButton({ id, children, isActive, onClickCallback, ref }) {
  return (
    <button
      className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
      ref={ref}
      id={id}
      type="button"
      onClick={onClickCallback}
    >
      {children}
    </button>
  );
}