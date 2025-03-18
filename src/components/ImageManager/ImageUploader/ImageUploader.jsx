import { useRef, useState } from "react";

import Button from "../../Button/Button";

import styles from "./ImageUploader.module.scss";

export default function ImageUploader({ uploadImage }) {
  const [gragActive, setDragActive] = useState(false);

  const inputFileRef = useRef(null);

  // Обработчики
  function handleFileChange(event) {
    const file = event.target.files[0];

    file && uploadImage(file);
  };
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    (event.dataTransfer.files && event.dataTransfer.files[0]) && uploadImage(event.dataTransfer.files[0]);
  };
  function handleDragOver(event) {
    event.preventDefault();

    setDragActive(true);
  };
  function handleDragLeave() {
    setDragActive(false);
  };
  function handleBlockDragToClick() {
    inputFileRef.current.click();
  };

  return (
    <div
      className={styles.imageUploader}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBlockDragToClick}
    >
      <div className={styles.imageUploaderContainer}>
        <div className={styles.imageUploaderContent}>
          <div className={styles.imageUploaderMainContent}>

            <svg className={styles.imageUploaderIcon} xmlns="http://www.w3.org/2000/svg" fill="none">
              <g strokeWidth="2">
                <rect height="38" rx="3" width="46" x="1" y="1" />
                <circle cx="35" cy="13" r="4" />
                <path d="m1 30 12-12.9a4 4 0 0 1 6 0l9.2 9.9a4 4 0 0 0 5.7 0l2.3-2.2a4 4 0 0 1 5.6 0l5.2 5.2" />
              </g>
            </svg>

            <span className={styles.imageUploaderText}>Перетащите изображение сюда или кликните для загрузки</span>

            <Button className={styles.imageUploaderButton}>Загрузить фото</Button>
          </div>

          <span className={styles.imageUploaderFormat}>Поддерживаются только изображения</span>
        </div>

        <input
          className={styles.imageUploaderInput}
          ref={inputFileRef}
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <svg className={styles.imageUploaderBorder} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <rect x=".5" y=".5" width="99" height="99" strokeWidth=".25" rx={.75} ry={.75} />
        </svg>
      </div>
    </div>
  );
}