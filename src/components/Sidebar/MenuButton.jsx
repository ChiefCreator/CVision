import styles from "./Sidebar.module.scss";

export default function MenuButton({ isOpen, icon, title, children, isButtonDropdownAbsolute, onClickCallback }) {

  return (
    <div className={`${styles.menuButton} ${isOpen ? styles.menuButtonActive : ""}`}>
      <button className={styles.menuButtonHead} type="button" onClick={onClickCallback}>
        <div className={styles.menuButtonIcon}>{icon}</div>
        <div className={styles.menuButtonContent} data-hide>
          <span className={styles.menuButtonTitle}>{title}</span>
          <span className={`${styles.menuButtonArrow}`}>
            <svg width={16} height={16} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
            </svg>
          </span>
        </div>
      </button>

      {isButtonDropdownAbsolute ? (
        <div className={`${styles.menuButtonDropdownAbsolute} ${isOpen ? styles.menuButtonDropdownAbsoluteOpen : ""}`}>
          {children}
        </div>
        ) :( 
          <div className={`${styles.menuButtonDropdown} ${isOpen ? styles.menuButtonDropdownOpen : ""}`}>
            <div className={styles.menuButtonDropdownContainer}>
              {children}
            </div>
          </div>
        )
      }
    </div>
  );
}
