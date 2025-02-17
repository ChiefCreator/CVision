import styles from "./ButtonClose.module.scss"

export default function ButtonClose({ className = "", onClickCallback }) {
  return (
    <button className={`${styles.button} ${className}`} type="button" onClick={onClickCallback}>
      <svg className={styles.buttonIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5857864,12 L3.79289322,5.20710678 L5.20710678,3.79289322 L12,10.5857864 L18.7928932,3.79289322 L20.2071068,5.20710678 L13.4142136,12 L20.2071068,18.7928932 L18.7928932,20.2071068 L12,13.4142136 L5.20710678,20.2071068 L3.79289322,18.7928932 L10.5857864,12 Z"></path>
      </svg>
    </button>
  );
}