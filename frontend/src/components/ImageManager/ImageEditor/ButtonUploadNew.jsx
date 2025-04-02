import { useRef } from "react";
import styles from "./ImageEditor.module.scss";

export default function ButtonUploadNew({ uploadNewImage }) {
  const inputFileRef = useRef();

  function handleClick() {
    inputFileRef?.current?.click();
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
  
    file && uploadNewImage(file);
  };

  return (
    <button className={styles.buttonUploadNew} type="button" onClick={handleClick}>
      <svg className={styles.buttonUploadNewIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path d="M21 19H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zM12 2a1 1 0 0 0-1 1v10.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0-1.42-1.42L13 13.59V3a1 1 0 0 0-1-1z"></path></svg>
      <span className={styles.buttonUploadNewTitle}>Загрузить новое</span>

      <input
        className={styles.buttonUploadNewInput}
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </button>
  );
}