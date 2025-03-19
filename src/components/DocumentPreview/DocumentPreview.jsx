import styles from "./DocumentPreview.module.scss";

import { useState, useRef, useEffect } from "react";

import DocumentContainer from "../DocumentContainer/DocumentContainer";
import DocumentPreviewPages from "./DocumentPreviewPages";

import templates from "./templates/templates";

import { filterObjectByArrayOfKeys } from "../../lib/objUtils";
import { cleanHTMLString } from "../../lib/stringUtils";

export default function DocumentPreview({ data, isDataLoaded, currentPageIndex, setTotalPages }) {
  const { component: Template, config: templateCongig } = templates[data?.template] ?? { component: null, config: null };

  const [pages, setPages] = useState([]);
  const [measured, setMeasured] = useState(false);

  const pageRef = useRef();
  const asideSectionsRefs = useRef({});
  const mainSectionsRefs = useRef({});
  const blocksOverSectionsRefs = useRef({});
  
  const headerSections = templateCongig?.getHeaderSections(data?.sections);
  const asideSections = templateCongig?.getAsideSections(data?.sections);
  const mainSections = templateCongig?.getMainSections(data?.sections);

  // console.log(data, headerSections, asideSections, mainSections)

  function getSectionHeight(sectionId, sectionsRefs) {
    const sectionRect = sectionsRefs.current[sectionId]?.getBoundingClientRect();

    return sectionRect ? sectionRect.height : 0;
  }
  function getItemDataSplits(sectionId, sectionsRefs, sections) {
    return sectionsRefs.current[sectionId]?.querySelectorAll(`[data-split]`) ? Array.from(sectionsRefs.current[sectionId].querySelectorAll(`[data-split]`))?.map(item => {
      const dataSplit = JSON.parse(item.dataset.split);
      const { dataPath, type, necessaryFields } = dataSplit;
      const data = dataPath.subSectionId ? sections.find(section => dataPath.sectionId === section.id).subSections.find(subSection => dataPath.subSectionId === subSection.id) : sections.find(section => dataPath.sectionId === section.id);

      return {
        item,
        type,
        dataPath,
        data,
        necessaryFields,
      }
    }) : [];
  }
  function getTrackItemsTotalHeight(sectionId, sectionsRefs) {
    return sectionsRefs.current[sectionId]?.querySelectorAll(`[data-split]`) ? Array.from(sectionsRefs.current[sectionId].querySelectorAll(`[data-track]`)).reduce((totalHeight, item) => totalHeight + item.offsetHeight, 0) : 0;
  }

  useEffect(() => {
    if (!pageRef.current || !measured) return;

    const pageRect = pageRef.current.getBoundingClientRect();
    const pageHeight = pageRect.height - 20;
    // const headerRect = blocksOverSectionsRefs.current.header.getBoundingClientRect();
    // const headerHeight = headerRect.height;
    const headerHeight = 400;

    function getSectionsPagesData(sectionsData, sectionsRefs) {
      const sectionsPagesData = [];
      let currentPage = [];

      let sectionsHeight = headerHeight;

      sectionsData.forEach(section => {
        // const itemDataSplits = getItemDataSplits(section.id, sectionsRefs, sectionsData);
        // let sectionHeight = getTrackItemsTotalHeight(section.id, sectionsRefs);

        // if (itemDataSplits.length) {
        //   currentPage.push({ title: section.title, id: section.id, subSections: [] });
          
        //   sectionsHeight += sectionHeight;
          
        //   itemDataSplits.forEach(({ item, data, type, dataPath, necessaryFields }) => {
        //     switch (type) {
        //       case "item": {
        //         const itemHeight = item.offsetHeight;
        //         sectionsHeight += itemHeight;
              
        //         if (sectionsHeight > pageHeight) {
        //           sectionsPagesData.push(currentPage);
        //           currentPage = [{ id: section.id, subSections: [data] }];
        //           sectionsHeight = itemHeight;
        //         } else {
        //           currentPage.find(section => section.id === dataPath.sectionId).subSections.push(data);
        //         }
        //       }
        //         break;
        //       case "text": {
        //         const text = cleanHTMLString(data[dataPath.splitField]);
        //         const words = text.split(" ");
              
        //         item.textContent = "";
        //         let remainingText = "";
        //         let splitText = "";
              
        //         const cloneItemForSplitText = item.cloneNode(true);
        //         cloneItemForSplitText.style.width = item.offsetWidth + "px";
        //         cloneItemForSplitText.style.visibility = "hidden";
        //         cloneItemForSplitText.style.position = "absolute";
        //         cloneItemForSplitText.style.top = "-9999px";
        //         document.body.append(cloneItemForSplitText);
              
        //         for (let word of words) {
        //           item.textContent += ` ${word}`;

        //           if (sectionsHeight + item.offsetHeight > pageHeight) {
        //             splitText += " " + word;
        //           } else {
        //             remainingText += " " + word;
        //           }
        //         }

        //         const isRenderOnlyOnCurrentPage = splitText === "";
        //         const isRenderOnCurrentAndNextPage = splitText !== "" && remainingText !== "";
        //         const isRenderOnlyOnNextPage = splitText !== "" && remainingText === "";

        //         const isHaveSubSection = dataPath.subSectionId;

        //         cloneItemForSplitText.textContent = splitText.trim();
        //         const splitTextHeight = cloneItemForSplitText.offsetHeight;
        //         cloneItemForSplitText.remove();

        //         if (isRenderOnCurrentAndNextPage) {
        //           if (isHaveSubSection) {
        //             currentPage.find(section => section.id === dataPath.sectionId).subSections.push({ id: dataPath.subSectionId, ...filterObjectByArrayOfKeys(data, necessaryFields?.currentAndNextPages), [dataPath.splitField]: remainingText });
        //           } else {
        //             currentPage.find(section => section.id === dataPath.sectionId)[dataPath.splitField] = remainingText;
        //           }

        //           sectionsHeight = splitTextHeight;
        //           sectionsPagesData.push(currentPage);
  
        //           if (isHaveSubSection) {
        //             currentPage = [{ id: section.id, subSections: [{ id: dataPath.subSectionId, ...filterObjectByArrayOfKeys(data, necessaryFields?.nextPage), [dataPath.splitField]: splitText }] }];
        //           } else {
        //             currentPage = [{ id: section.id, [dataPath.splitField]: splitText }];
        //           }
        //         } else if (isRenderOnlyOnCurrentPage) {
        //           if (isHaveSubSection) {
        //             currentPage.find(section => section.id === dataPath.sectionId).subSections.push({ id: dataPath.subSectionId, ...filterObjectByArrayOfKeys(data, necessaryFields?.currentPage), [dataPath.splitField]: remainingText });
        //           } else {
        //             currentPage.find(section => section.id === dataPath.sectionId)[dataPath.splitField] = remainingText;
        //           }

        //           sectionsHeight += item.offsetHeight;
        //         } else {
        //           sectionsHeight = splitTextHeight;
        //           sectionsPagesData.push(currentPage);
  
        //           if (isHaveSubSection) {
        //             currentPage = [{ id: section.id, subSections: [{ id: dataPath.subSectionId, ...filterObjectByArrayOfKeys(data, dataPath.necessaryFieldsOnNextPage), [dataPath.splitField]: splitText }] }];
        //           } else {
        //             currentPage = [{ id: section.id, [dataPath.splitField]: splitText }];
        //           }
        //         }
        //       }
        //         break;
        //     }
        //   })
        // } else {
          let sectionHeight = getSectionHeight(section.id, sectionsRefs);
  
          if (sectionsHeight + sectionHeight > pageHeight) {
            sectionsPagesData.push(currentPage);
            currentPage = [section];
            sectionsHeight = sectionHeight;
          } else {
            sectionsHeight += sectionHeight;
            currentPage.push(section);
          }
        // }        
      });

      if (currentPage.length) sectionsPagesData.push(currentPage);

      return sectionsPagesData;
    }
    function getPages(asideSectionsPagesData, mainSectionsPagesData) {
      let pagesArray = [];
      const pagesCount = Math.max(asideSectionsPagesData.length, mainSectionsPagesData.length);

      for (let i = 0; i < pagesCount; i++) {
        const currentPage = { isHeader: i === 0, headerSections: headerSections, asideSections: asideSectionsPagesData[i] ?? [], mainSections: mainSectionsPagesData[i] ?? [] };

        pagesArray.push(currentPage);
      }

      return pagesArray;
    }

    let asideSectionsPagesData = getSectionsPagesData(asideSections, asideSectionsRefs);
    let mainSectionsPagesData = getSectionsPagesData(mainSections, mainSectionsRefs);

    const pagesArray = getPages(asideSectionsPagesData, mainSectionsPagesData);

    setPages(pagesArray);
    if (setTotalPages) setTotalPages(pagesArray.length);
  }, [data, measured]);

  if (!isDataLoaded) return null;

  return (
    <div className={styles.documentPreview}>
      <div className={styles.documentPreviewMeasuredTemplate} ref={pageRef}>
        {Template && 
          <Template
            isHeader={true}

            headerSections={headerSections}
            asideSections={asideSections}
            mainSections={mainSections}

            lineSpacing={data.lineSpacing}

            asideSectionsRefs={asideSectionsRefs}
            mainSectionsRefs={mainSectionsRefs}
            blocksOverSectionsRefs={blocksOverSectionsRefs}

            onRender={() => setMeasured(true)}
        />}
      </div>
      
      <DocumentContainer>
        <DocumentPreviewPages
          currentPageIndex={currentPageIndex}
          pages={pages}
          TemplateComponent={Template}
          lineSpacing={data.lineSpacing}
        />
      </DocumentContainer>
    </div>
  );
}