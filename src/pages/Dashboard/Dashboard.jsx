import Tabs from "../../components/Tabs/Tabs";
import TabPanel from "../../components/Tabs/TabPanel";
import DocumentCardList from "../../components/DocumentCardList/DocumentCardList";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";

import { generateUUID } from "three/src/math/MathUtils.js";

import { useResumeContext } from "../../context/ResumeContext";
import { useCoverLetters } from "../../context/CoverLettersContext";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const { resumes, loadingState } = resumesDataState;
  const isResumesLoaded = loadingState === "loaded";

  const { coverLettersDataState, dispatchOfCoverLettersDataState } = useCoverLetters();
  const isCoverLettersDataLoaded = coverLettersDataState.loadingState === "loaded";
  const coverLetters = coverLettersDataState.coverLetters;


  // обработчики событий
  function handleEditButtonClick(path) {
    navigate(path);
  }
  function handleDeleteButtonClick(documentType, documentId) {
    switch(documentType) {
      case "resume":
        dispatchOfResumesDataState({
          type: "DELETE_RESUME",
          resumeId: documentId,
        });
        break;
      case "coverLetter":
        dispatchOfCoverLettersDataState({
          type: "DELETE_COVER_LETTER",
          coverLetterId: documentId,
        });
        break;
    }
  }
  function handleDocumentCardTitleChange(documentType, documentId, key, value) {
    switch(documentType) {
      case "resume":
        dispatchOfResumesDataState({
          type: "UPDATE_RESUME_FIELD",
          resumeId: documentId,
          key,
          value,
        });
        break;
      case "coverLetter":
        dispatchOfCoverLettersDataState({
          type: "UPDATE_COVER_LETTER_FIELD",
          coverLetterId: documentId,
          key,
          value,
        });
        break;
    }
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
            {isResumesLoaded && resumes.map(resume => {
              return (
                <DocumentCard
                  key={resume.id}
                  data={resume}
                  isResumeDataLoaded={isResumesLoaded}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("resume", resume.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/resumes/${resume.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("resume", resume.id)}
                />
              );
            })}

            {isCoverLettersDataLoaded && coverLetters.map(coverLetter => {
              return (
                <DocumentCard
                  key={coverLetter.id}
                  data={coverLetter}
                  isResumeDataLoaded={isCoverLettersDataLoaded}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("coverLetter", coverLetter.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/cover-letters/${coverLetter.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("coverLetter", coverLetter.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
        <TabPanel title="Резюме" id="resumes">
          <DocumentCardList>
            {isResumesLoaded && resumes.map(resume => {
              return (
                <DocumentCard
                  key={resume.id}
                  data={resume}
                  isResumeDataLoaded={isResumesLoaded}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("resume", resume.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/resumes/${resume.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("resume", resume.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
        <TabPanel title="Сопроводительные письма" id="cover-letters">
          <DocumentCardList>
            {isCoverLettersDataLoaded && coverLetters.map(coverLetter => {
              return (
                <DocumentCard
                  key={coverLetter.id}
                  data={coverLetter}
                  isResumeDataLoaded={isCoverLettersDataLoaded}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("coverLetter", coverLetter.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/cover-letters/${coverLetter.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("coverLetter", coverLetter.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
      </Tabs>
    </div>
  );
}