import styles from "./ButtonAdd.module.scss"

export default function ButtonAdd({ children, callbackOnClick, appearance = "no-bg", ref }) {

  function handleClick(event) {
    event.preventDefault();
    
    if (callbackOnClick) callbackOnClick();
  }

  return(
    <button 
      className={styles.button}
      onClick={handleClick}
      data-appearance={appearance}
      ref={ref}
    >
      <div className={styles.buttonIconWrapper}>
        <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path fill="currentColor" d="M450.001-450.001h-200q-12.75 0-21.375-8.628t-8.625-21.384 8.625-21.371 21.375-8.615h200v-200q0-12.75 8.628-21.375t21.384-8.625 21.371 8.625 8.615 21.375v200h200q12.75 0 21.375 8.628t8.625 21.384-8.625 21.371-21.375 8.615h-200v200q0 12.75-8.628 21.375t-21.384 8.625-21.371-8.625-8.615-21.375z"></path>
        </svg>
      </div>
      <div className={styles.buttonTitleWrapper}>
        <span className={styles.buttonTitle}>{children}</span>
      </div>
    </button>
  );
}