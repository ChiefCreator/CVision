import styles from "./ResumePreview.module.scss";

import { useState, useRef, useEffect } from "react";

import Template_1 from "./templates/Template_1/Template_1";

import template_1_config from "./templates/Template_1/template_1_config";

import DocumentContainer from "./../DocumentContainer/DocumentContainer";
import ResumePreviewPages from "./ResumePreviewPages";

export default function ResumePreview({ resumeData, isResumeDataLoaded, currentPageIndex, setTotalPages }) {
  const [pages, setPages] = useState([]);
  const [measured, setMeasured] = useState(false);

  const pageRef = useRef();
  const asideSectionsRefs = useRef({});
  
  const asideSections = template_1_config.getAsideSections(resumeData?.sections);
  const mainSections = template_1_config.getMainSections(resumeData?.sections);

  function getAsideSectionBottomPos(sectionId, pageRect) {
    const sectionRect = asideSectionsRefs.current[sectionId]?.getBoundingClientRect();

    const bottomPos = sectionRect ? sectionRect.bottom - pageRect.top : 0;

    return bottomPos;
  }

  useEffect(() => {
    setMeasured(true);
  }, []);
  useEffect(() => {
    if (!pageRef.current || !measured) return;

    const pageRect = pageRef.current.getBoundingClientRect();
    const pageHeight = pageRect.height;

    let currentPage = { header: true, asideSections: [], mainSections: [] };
    let pagesArray = [];
  
    let lastPosition = 0;

    asideSections.forEach((section, index) => {
      const sectionBottomPos = getAsideSectionBottomPos(section.id, pageRect);

      if (sectionBottomPos - lastPosition > pageHeight) {
        pagesArray.push(currentPage);
        currentPage = { header: false, asideSections: [], mainSections: [] };
        lastPosition = getAsideSectionBottomPos(asideSections[index - 1].id, pageRect) || 0;
      }
      currentPage.asideSections.push(section);
    });

    if (currentPage.asideSections.length > 0) pagesArray.push(currentPage);

    setPages(pagesArray);
    if (setTotalPages) setTotalPages(pagesArray.length);
  }, [resumeData, measured]);

  if (isResumeDataLoaded) {

    return (
    <div className={styles.resumePreview}>
      <div className={styles.resumePreviewSource} data-load={resumeData.id}>
        {/* <div className={styles.pages}>
          {pages.map((page, pageIndex) => (
            <Template_1 key={pageIndex} isHeader={page.header} asideSections={page.asideSections} mainSections={mainSections} resumeData={resumeData} />
          ))}
        </div> */}
      </div>
      <DocumentContainer>
        <div className={styles.resumePreviewMeasuredTemplate}>
          <Template_1 resumeData={resumeData} isHeader={true} asideSections={asideSections} mainSections={mainSections} asideSectionsRefs={asideSectionsRefs} />
        </div>
        <ResumePreviewPages
          currentPageIndex={currentPageIndex}
          ref={pageRef}
          pages={pages}
          TemplateComponent={Template_1}
          mainSections={mainSections}
          resumeData={resumeData}
        />
      </DocumentContainer>
    </div>
    );
  }
}