import styles from "./DocumentCard.module.scss";

export default function ActionButton({ children, icon, onClickCallback, className }) {
  return (
    <button className={`${styles.actionButton} ${className ? className : ""}`} type="button" onClick={onClickCallback}>
      <span className={styles.actionButtonIcon}>{icon}</span>
      <span className={styles.actionButtonTitle}>{children}</span>
    </button>
  );
}