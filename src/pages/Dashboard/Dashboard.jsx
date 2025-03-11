import Tabs from "../../components/Tabs/Tabs";
import TabPanel from "../../components/Tabs/TabPanel";
import DocumentCardList from "../../components/DocumentCardList/DocumentCardList";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import ResumePreview from "../../components/ResumePreview/ResumePreview";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";

import { generateUUID } from "three/src/math/MathUtils.js";

import { useResumeContext } from "../../context/ResumeContext";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const { resumes, loadingState } = resumesDataState;
  const isResumesLoaded = loadingState === "loaded";

  // обработчики событий
  function handleEditButtonClick(page, documentId) {
    navigate(`/${page}/${documentId}`);
  }
  function handleDeleteButtonClick(resumeId) {
    dispatchOfResumesDataState({
      type: "DELETE_RESUME",
      resumeId,
    });
  }
  function handleDocumentCardTitleChange(resumeId, key, value) {
    dispatchOfResumesDataState({
      type: "UPDATE_RESUME_FIELD",
      resumeId,
      key,
      value,
    });
  }
  function handleButtonAddDocument() {
    const resumeId = generateUUID();

    dispatchOfResumesDataState({
      type: "ADD_RESUME",
      resumeId,
      isAddDefaultResumeData: true,
    })

    navigate(`/create-resume/${resumeId}`);
  }

  return (
    <div>
      <Tabs
        controlsPanel={{
          components: [
            <ButtonAdd
              key="button-add"
              appearance="bg"
              callbackOnClick={handleButtonAddDocument}
            >
              Добавить новый документ
            </ButtonAdd>
          ],
        }}
      >
        <TabPanel title="Все документы" id="all-documents">
          <DocumentCardList>
            {isResumesLoaded && resumesDataState.resumes.map(resume => {
              return (
                <DocumentCard
                  key={resume.id}
                  data={resume}
                  isResumeDataLoaded={isResumesLoaded}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange(resume.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick("create-resume", resume.id)}
                  onDeleteButtonClick={() => handleDeleteButtonClick(resume.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
        <TabPanel title="Резюме" id="resumes">
          <DocumentCardList>
            {/* {isResumesLoaded && resumes.map(resume => {
              return (
                <DocumentCard
                  key={resume.id}
                  data={resume}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange(resume.id, "title", value)}
                  documentPreview={<ResumePreview resumeData={resume} isResumeDataLoaded={isResumesLoaded} />}
                />
              );
            })} */}
          </DocumentCardList>
        </TabPanel>
        <TabPanel title="Сопроводительные письма" id="cover-letters">
        </TabPanel>
      </Tabs>
    </div>
  );
}