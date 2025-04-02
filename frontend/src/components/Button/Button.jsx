import styles from './Button.module.scss';

export default function Button({ type = "button", children, className, onClickCallback }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClickCallback}
    >{children}</button>
  );
}