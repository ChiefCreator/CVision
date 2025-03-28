import { useRef, useState, useEffect } from 'react';

import DocumentContainer from '../DocumentContainer/DocumentContainer';

import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

import DocumentPreview from "../DocumentPreview/DocumentPreview";

import styles from './DocumentCard.module.scss';

import EditableTitle from "./../EditableTitle/EditableTitle";
import ActionButton from './ActionButton';

import { convertFromDateToDDMonthYYYYFormat, getTimeAgo } from '../../lib/dateUtils';

export default function DocumentCard({ data, onChangeTitleCallback, onEditButtonClick, onDeleteButtonClick }) {
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [previewRotation, setPreviewRotation] = useState({ rotateX: 0, rotateY: 0 });
  const [currentDate, setCurrentDate] = useState(new Date());
  const documentPreviewRef = useRef();

  const editButtonIcon = <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 24 24"><g><path d="m14.46 3.26.88-.88c1.04-1.04 2.85-1.04 3.89 0l.71.71a2.732 2.732 0 0 1 0 3.88l-.88.88-4.6-4.6zM13.4 4.32l-9.11 9.11c-.29.29-.47.67-.5 1.08l-.27 2.93c-.03.37.1.73.36 1 .24.24.55.37.88.37h.11l2.93-.27c.41-.04.79-.22 1.08-.51l9.11-9.11-4.6-4.6zM22.75 22c0-.41-.34-.75-.75-.75H2c-.41 0-.75.34-.75.75s.34.75.75.75h20c.41 0 .75-.34.75-.75z"></path></g></svg>
  const duplicateButtonIcon = <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M5 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm1 2v8h8v-8H6zm12-4H9V5h10a1 1 0 0 1 1 1v10h-2V7z"></path></svg>
  const downLoadPDFButtonIcon = <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9,6 L9,13 L7.20376823,13 L12,18.4814077 L16.7962318,13 L15,13 L15,6 L9,6 Z M7,11 L7,5 C7,4.44771525 7.44771525,4 8,4 L16,4 C16.5522847,4 17,4.44771525 17,5 L17,11 L19,11 C19.8591588,11 20.3183367,12.0119217 19.7525767,12.6585046 L12.7525767,20.6585046 C12.3541654,21.1138318 11.6458346,21.1138318 11.2474233,20.6585046 L4.24742331,12.6585046 C3.68166327,12.0119217 4.14084119,11 5,11 L7,11 Z"></path></svg>
  const deleteButtonIcon = <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M8,19 L16,19 L16,13 L8,13 L8,19 Z M16,7 L20,7 L20,9 L4,9 L4,7 L8,7 L8,3 L16,3 L16,7 Z M14,7 L14,5 L10,5 L10,7 L14,7 Z M6,11 L18,11 L18,21 L6,21 L6,11 Z" fill-rule="nonzero"></path></svg>

  function handlePreviewMousemove(event) {
    const mousePos = { x: event.clientX, y: event.clientY};
    const rect = documentPreviewRef.current.getBoundingClientRect();
    setPreviewRotation(getLevelOfRotation(mousePos, rect));
  }
  function handlePreviewMouseenter() {
    setIsPreviewHovered(true);
  }
  function handlePreviewMouseleave() {
    setIsPreviewHovered(false);
    setPreviewRotation({ rotateX: 0, rotateY: 0 });
  }

  function getLevelOfRotation(mousePos, rect) {
    function getMousePosRelatedToPreview() {
      const x = mousePos.x - rect.left;
      const y = mousePos.y - rect.top;
  
      return {
        x: (x < 0) ? 0 : x > rect.height ? rect.height : x,
        y: (y < 0) ? 0 : y > rect.height ? rect.height : y,
      };
    }
    function getNormalizedMousePosRelatedPreview(mousePos) {
      return {
        x: 2 * (mousePos.x - rect.width / 2) / rect.width,
        y: 2 * (mousePos.y - rect.height / 2) / rect.height,
      };
    }

    const mousePosRelatedToPreview = getMousePosRelatedToPreview();
    const normalizedMousePosRelatedToPreview = getNormalizedMousePosRelatedPreview(mousePosRelatedToPreview);

    return {
      rotateX: normalizedMousePosRelatedToPreview.y * 10,
      rotateY: normalizedMousePosRelatedToPreview.x * 10,
    };
  }

  function editDocument() {
    if (onEditButtonClick) onEditButtonClick();
  }
  function duplicateDocument() {

  }
  function downLoadPDFDocument() {
    handleConvertToCanvas()
  }
  function handleConvertToCanvas() {
    const content = documentPreviewRef.current;

    html2canvas(content).then((canvas) => {
      // Получаем размеры страницы PDF A4 в миллиметрах
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.width; // Ширина страницы A4
      const pageHeight = pdf.internal.pageSize.height; // Высота страницы A4

      // Получаем размеры canvas
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Масштабируем canvas, чтобы он поместился на всю страницу
      const scale = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);

      // Рассчитываем новые размеры изображения, чтобы оно поместилось на странице
      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;

      // Добавляем canvas в PDF (масштабируя изображение)
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      // Сохраняем PDF
      pdf.save('document.pdf');
    });
  };
  function deleteDocument() {
    if (onDeleteButtonClick) onDeleteButtonClick();
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardPreviewWrapper}>
        <div
          className={`${styles.preview} ${!isPreviewHovered ? styles.previewTransition : ""}`}
          ref={documentPreviewRef}
          type="button"
          onClick={onEditButtonClick}
          onMouseMove={handlePreviewMousemove}
          onMouseLeave={handlePreviewMouseleave}
          onMouseEnter={handlePreviewMouseenter} 
          style={{ transform: `rotateX(${previewRotation.rotateX}deg) rotateY(${previewRotation.rotateY}deg)` }}
        >
          <DocumentPreview data={data} />
        </div>
      </div>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardInfo}>
          <header className={styles.cardInfoHeader}>
            <EditableTitle className={styles.cardInfoTitle} onChangeCallback={onChangeTitleCallback} placeholder = "Без названия">{data.title}</EditableTitle>
            {data.changeDate && <span className={styles.cardInfoTime}>{getTimeAgo(data.changeDate, currentDate)}</span>}
          </header>
          <div className={styles.cardInfoBody}>
            <div className={styles.cardInfoButtonsList}>
              <ActionButton className={styles.actionButtonEdit} icon={editButtonIcon} onClickCallback={editDocument}>Изменить</ActionButton>
              <ActionButton className={styles.actionButtonDuplicate} icon={duplicateButtonIcon} onClickCallback={duplicateDocument}>Дубликат</ActionButton>
              <ActionButton className={styles.actionButtonDownloadPDF} icon={downLoadPDFButtonIcon} onClickCallback={downLoadPDFDocument}>Скачать в PDF</ActionButton>
              <ActionButton className={styles.actionButtonDelete} icon={deleteButtonIcon} onClickCallback={deleteDocument}>Удалить</ActionButton>
            </div>
          </div>
          {data?.creationDate &&
            <footer className={styles.cardInfoFooter}>
              <span className={styles.cardInfoTime}>Создан {convertFromDateToDDMonthYYYYFormat(data.creationDate)}</span>
            </footer>}
        </div>
      </div>
    </div>
  );
}