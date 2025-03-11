import styles from "./ResumePreviewNavigation.module.scss";

export default function ResumePreviewNavigation({ currentPageIndex, totalPages, setCurrentPageIndex }) {
  currentPageIndex++;

  return (
    <div className={styles.resumePreviewNavigation}>
      <button className={`${styles.button} ${styles.buttonPrev}`} disabled={currentPageIndex === 1} type="button" onClick={() => setCurrentPageIndex(prev => --prev)}>
        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9.32427537,7.23715414 L10.6757246,5.76284586 L16.6757246,11.2628459 C17.1080918,11.6591824 17.1080918,12.3408176 16.6757246,12.7371541 L10.6757246,18.2371541 L9.32427537,16.7628459 L14.5201072,12 L9.32427537,7.23715414 Z"></path></svg>
      </button>
      
      <span className={styles.resumePreviewNavigationTitle}>{currentPageIndex} / {totalPages}</span>

      <button className={`${styles.button} ${styles.buttonNext}`} disabled={currentPageIndex === totalPages} type="button" onClick={() => setCurrentPageIndex(prev => ++prev)}>
        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9.32427537,7.23715414 L10.6757246,5.76284586 L16.6757246,11.2628459 C17.1080918,11.6591824 17.1080918,12.3408176 16.6757246,12.7371541 L10.6757246,18.2371541 L9.32427537,16.7628459 L14.5201072,12 L9.32427537,7.23715414 Z"></path></svg>
      </button>
    </div>
  );
}