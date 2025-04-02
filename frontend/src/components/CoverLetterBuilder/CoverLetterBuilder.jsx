import { useState } from "react";

import styles from "./CoverLetterBuilder.module.scss";

import EditableTitle from "../EditableTitle/EditableTitle";
import ModalSidebarTrigger from "../ModalSidebarTrigger/ModalSidebarTrigger";
import Sidebar from "../Sidebar/Sidebar";
import CoverLetterFormBuilder from "./CoverLetterFormBuilder/CoverLetterFormBuilder";
import DocumentBuilderPreview from "./../DocumentBuilderPreview/DocumentBuilderPreview";

import { useCoverLetters } from "../../context/CoverLettersContext";

export default function CoverLetterBuilder({ coverLetterId }) {
  const { coverLettersDataState, dispatchOfCoverLettersDataState } = useCoverLetters();
  const isCoverLettersDataLoaded = coverLettersDataState.loadingState === "loaded";
  const coverLetterData = coverLettersDataState.coverLetters?.find(item => item.id === coverLetterId);

  const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);

  function handleFieldChange(key, value) {
    dispatchOfCoverLettersDataState({
      type: "UPDATE_COVER_LETTER_FIELD",
      userId: "userId",
      coverLetterId,
      value,
      key,
    });
  }
  function handleSectionFieldChange(sectionId, key, value) {
    dispatchOfCoverLettersDataState({
      type: "UPDATE_COVER_LETTER_SECTION_FIELD",
      userId: "userId",
      coverLetterId,
      sectionId,
      value,
      key,
    });
  }

  return (
    <div className={styles.coverLetterBuilder}>
      <ModalSidebarTrigger isSidebarModalOpen={isSidebarModalOpen} setIsSidebarModalOpen={setIsSidebarModalOpen} />
      <Sidebar defaultActiveItemId="none" isModal={true} isModalOpen={isSidebarModalOpen} isHeaderRendered={true} />

      <div className={styles.coverLetterBuilderContainer}>
        <div className={styles.coverLetterBuilderInfo}>
          <div className={styles.coverLetterBuilderTitleWrapper}>
            <EditableTitle fontSize={27} onChangeCallback={(value) => handleFieldChange("title", value)}>
              {coverLetterData?.title}
            </EditableTitle>
          </div>

          <CoverLetterFormBuilder coverLetterData={coverLetterData} isCoverLettersDataLoaded={isCoverLettersDataLoaded} changeSectionField={handleSectionFieldChange} />
        </div>

        <DocumentBuilderPreview data={coverLetterData} isDataLoaded={isCoverLettersDataLoaded} changeDocumentField={handleFieldChange} />
      </div>
    </div>
  );
}
