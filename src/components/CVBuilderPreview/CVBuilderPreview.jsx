import { useState } from "react";

import { useResumeContext } from "../../context/ResumeContext";
import ResumePreview from "../ResumePreview/ResumePreview";
import ValueAdjuster from "../ValueAdjuster/ValueAdjuster";
import Button from "./Button/Button";
import ResumePreviewNavigation from "./ResumePreviewNavigation/ResumePreviewNavigation";

import styles from "./CVBuilderPreview.module.scss";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CVBuilderPreview({ resumeData, isResumeDataLoaded }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  function downLoadPDFDocument() {
    const content = document.querySelector(`[data-load="${resumeData.id}"]`);

    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scale = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);

      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save('document.pdf');
    });
  };
  function handleValueAdjusterChange(value) {
    dispatchOfResumesDataState({
      type: "UPDATE_RESUME_FIELD",
      resumeId: resumeData.id,
      key: "lineSpacing",
      value,
    })
  }

  return (
    <div className={styles.cvBuilderPreview}>
      <div className={styles.cvBuilderPreviewContainer}>
        <div className={styles.cvBuilderPreviewControls}>
          <Button
            icon={<svg className={styles.buttonIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5v4h4v-4h-4zM11 4v7H4V4h7zm3.5 1.5v4h4v-4h-4zM20 4v7h-7V4h7zM5.5 14.5v4h4v-4h-4zM11 13v7H4v-7h7zm3.5 1.5v4h4v-4h-4zM20 13v7h-7v-7h7z"></path></svg>}
          >
            Выбрать шаблон
          </Button>

          <ValueAdjuster
            propertyTitle="Межстрочный интервал"
            propertyIllustration={<svg width="24" height="24" fill="white" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M11.835 17h1.615L8.89 5.03H7.56L3 17h1.615l1.14-2.945h4.94L11.835 17zm-3.61-9.5l1.995 5.225H6.23L8.225 7.5zM17.9113 8.355c-1.9 0-3.04 1.14-3.23 2.565h1.52c.19-.76.665-1.235 1.71-1.235s1.805.76 1.805 1.615v.475c-4.275 0-5.415 1.14-5.415 2.755 0 1.425 1.14 2.565 2.85 2.565 1.71 0 2.565-1.045 2.565-1.045l.38.95h1.045v-5.7c0-1.615-1.33-2.945-3.23-2.945zm-.76 7.41c-.855 0-1.425-.57-1.425-1.14 0-.95.57-1.52 3.99-1.52v.665c0 .95-1.045 1.995-2.565 1.995z"></path></svg>}
            value={resumeData?.lineSpacing}
            defaultValue={100}
            minValue={50}
            maxValue={150}
            step={25}
            unitOfMeasurement="%"
            setValue={(value) => handleValueAdjusterChange(value)}
          />

          <Button
            icon={<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9,6 L9,13 L7.20376823,13 L12,18.4814077 L16.7962318,13 L15,13 L15,6 L9,6 Z M7,11 L7,5 C7,4.44771525 7.44771525,4 8,4 L16,4 C16.5522847,4 17,4.44771525 17,5 L17,11 L19,11 C19.8591588,11 20.3183367,12.0119217 19.7525767,12.6585046 L12.7525767,20.6585046 C12.3541654,21.1138318 11.6458346,21.1138318 11.2474233,20.6585046 L4.24742331,12.6585046 C3.68166327,12.0119217 4.14084119,11 5,11 L7,11 Z"></path></svg>}
            onClickCallback={downLoadPDFDocument}
          >
            Скачать PDF
          </Button>
        </div>

        <div className={styles.cvBuilderPreviewWrapperPreview}>
          <ResumePreview resumeData={resumeData} isResumeDataLoaded={isResumeDataLoaded} currentPageIndex={currentPageIndex} setTotalPages={setTotalPages} />
        </div>

        <div className={styles.cvBuilderPreviewBottomControls}>
          <ResumePreviewNavigation currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}