import styles from "./SectionOfSubSections.module.scss";

import EditableTitle from "../../EditableTitle/EditableTitle";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import SectionAccordion from "../SectionAccordion/SectionAccordion";
import { useResumeContext } from "../../../context/ResumeContext";
import { generateUUID } from "three/src/math/MathUtils.js";
import { useState } from "react";

export default function SectionOfSubSections({ title, defaultTitle, description, SubSectionComponent, subSectionsData = [], buttonAddTitle = "Добавить", resumeId, sectionId, isResumeDataLoaded, subSectionTitleAndSubTitlePattern }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const [openIndex, setOpenIndex] = useState({ current: 0, beforeDragStart: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const subSectionsCount = subSectionsData.length;

  // методы
  function handleSectionFieldChange(sectionId, key, value) {
    dispatchOfResumesDataState({
      type: "UPDATE_RESUME_SECTION_FIELD",
      resumeId: resumeId,
      sectionId,
      key,
      value,
    });
  }
  function addNewItem() {
    dispatchOfResumesDataState({
      type: "ADD_RESUME_SUB_SECTION",
      resumeId: resumeId,
      sectionId: sectionId,
      subSectionId: generateUUID(),
      order: subSectionsCount,
      documentFields: { parameterId: "expert" }
    });

    setOpenIndex({ current: subSectionsCount, beforeDragStart: subSectionsCount });
  }

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder={defaultTitle} fontSize={22} onChangeCallback={(value) => handleSectionFieldChange(sectionId, "title", value)}>{title ?? defaultTitle}</EditableTitle>
        {description ? <p className={styles.sectionDescription}>{description}</p> : null}
      </header>
      <div className={styles.sectionBody}>
      <SectionAccordion openIndex={openIndex} setOpenIndex={setOpenIndex} draggingIndex={draggingIndex} setDraggingIndex={setDraggingIndex} ContentComponent={SubSectionComponent} contentComponentsData={subSectionsData} resumeId={resumeId} sectionId={sectionId} isResumeDataLoaded={isResumeDataLoaded} titleAndSubTitlePattern={subSectionTitleAndSubTitlePattern} />
        <div className={styles.sectionButtonAddWrapper}>
          <ButtonAdd callbackOnClick={addNewItem}>{buttonAddTitle}</ButtonAdd>
        </div>
      </div>
    </div>
  );
}
