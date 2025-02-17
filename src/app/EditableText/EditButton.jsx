import styles from "./EditButton.module.scss";

export default function EditButton({ className, children, onClickCallback, isActive }) {
  return (
    <button
      className={`${styles.button} ${isActive && styles.buttonActive} ${className}`}
      type="button"
      onClick={onClickCallback}
    >
      {children}
    </button>
  );
}