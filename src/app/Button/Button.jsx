import styles from './Button.module.scss';

export default function Button({ children, className, onClickCallback }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type="button"
      onClick={onClickCallback}
    >{children}</button>
  );
}