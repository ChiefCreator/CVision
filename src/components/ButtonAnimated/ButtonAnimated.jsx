import styles from './ButtonAnimated.module.scss';

export default function ButtonAnimated({ children, className, onClickCallback }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type="button"
      onClick={onClickCallback}
    >
      <div className={styles.buttonContainer}>
        <span className={styles.buttonTitle}>{children}</span>
      </div>
    </button>
  );
}