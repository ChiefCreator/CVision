import styles from './Button.module.scss';

export default function Button({ children, icon, className, onClickCallback }) {
  function handleClick() {
    if (onClickCallback) onClickCallback();
  }

  return (
    <button className={`${styles.button} ${className ? className : ""}`} type="button" onClick={handleClick}>
      <div className={styles.buttonIcon}>{icon}</div>
      <span className={styles.buttonTitle}>{children}</span>
    </button>
  );
}