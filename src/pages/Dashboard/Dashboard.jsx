import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { createDefaultResume, createDefaultCoverLetter } from "../../lib/documentUtils";

import { useAuth } from "../../context/AuthContext";
import { useResumeContext } from "../../context/ResumeContext";
import { useCoverLetters } from "../../context/CoverLettersContext";
import { generateUUID } from "three/src/math/MathUtils.js";

import styles from "./Dashboard.module.scss";
import noDocumentsSrc from "./../../assets/images/no-documents.jpg";
import noResumeSrc from "./../../assets/images/no-resume.jpg";
import noCoverLetterSrc from "./../../assets/images/no-cover-letter.jpg";

import Tabs from "../../components/Tabs/Tabs";
import TabPanel from "../../components/Tabs/TabPanel";
import DocumentCardList from "../../components/DocumentCardList/DocumentCardList";
import DocumentCard from "../../components/DocumentCard/DocumentCard";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import NoDocuments from "../../components/NoDocuments/NoDocuments";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfileState } = useAuth();

  const { resumesDataState, dispatchOfResumesDataState, addResumeToDatabase, deleteResumeFromDatabase } = useResumeContext();
  const { resumes } = resumesDataState;

  const { coverLettersDataState, dispatchOfCoverLettersDataState, addCoverLetterToDatabase, deleteCoverLetterFromDatabase } = useCoverLetters();
  const coverLetters = coverLettersDataState.coverLetters;

  const [isDropdownCreateDocOpen, setIsDropdownCreateDocOpen] = useState(false);
  const [isDropdownCreateDocOpenOnNoDocs, setIsDropdownCreateDocOpenOnNoDocs] = useState(false);

  const buttonCreateDocumentRef = useRef(null);
  const buttonCreateDocumentOnNoDocumentsRef = useRef(null);

  const buttonCreateDocumentControlsData = [
    { 
      id: "control-1",
      title: "Создать резюме",
      icon: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><g><g><path d="m26.71 8.29-6-6A1 1 0 0 0 20 2H8a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9a1 1 0 0 0-.29-.71zM21 5.41 23.59 8H22a1 1 0 0 1-1-1zM24 28H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11v3a3 3 0 0 0 3 3h3v17a1 1 0 0 1-1 1z"></path><path d="M13 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM10 20h6a1 1 0 0 0 1-1v-2a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1zm1-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4zM22 23H10a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2zM22 18h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM22 13h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2z"></path></g></g></svg>,
      onClick: createNewResume,
    },
    { 
      id: "control-2",
      title: "Создать сопроводительное письмо",
      icon: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M29.958 12.758a2.303 2.303 0 0 0-.859-1.786l-1.92-1.545V6.229a2.314 2.314 0 0 0-2.31-2.311h-4.533L17.45 1.59a2.327 2.327 0 0 0-2.9.001l-2.886 2.327H7.131a2.313 2.313 0 0 0-2.31 2.311v3.199l-1.92 1.545a2.3 2.3 0 0 0-.859 1.786l-.002.008V28.59a2.314 2.314 0 0 0 2.31 2.311h23.3a2.314 2.314 0 0 0 2.31-2.311V12.767l-.002-.009zm-1.988-.383c.166.133.19.307.19.397s-.025.264-.19.396l-.791.637v-2.067zM15.679 2.992a.515.515 0 0 1 .641-.001l1.149.927h-2.938zM7.131 5.719h17.738a.51.51 0 0 1 .51.51v9.025l-9.06 7.29a.517.517 0 0 1-.64 0l-9.06-7.29V6.229a.513.513 0 0 1 .512-.51zm-2.31 6.019v2.068l-.792-.637c-.165-.133-.189-.306-.189-.396s.024-.265.19-.397zM27.65 29.1H4.35a.51.51 0 0 1-.51-.51V15.327l10.712 8.62c.419.338.934.506 1.448.506s1.028-.168 1.448-.506l10.712-8.62V28.59a.51.51 0 0 1-.51.51z"></path><path d="M10.181 10.483h5.95a.9.9 0 0 0 0-1.8h-5.95a.9.9 0 0 0 0 1.8zM10.181 14.619h11.95a.9.9 0 0 0 0-1.8h-11.95a.9.9 0 0 0 0 1.8z"></path></svg>,
      onClick: createNewCoverLetter,
    }
  ];

  // обработчики событий
  function handleEditButtonClick(path) {
    navigate(path);
  }
  function handleDeleteButtonClick(documentType, documentId) {
    switch(documentType) {
      case "resume":
        dispatchOfResumesDataState({ type: "DELETE_RESUME", resumeId: documentId });

        deleteResumeFromDatabase(documentId);
        break;
      case "coverLetter":
        dispatchOfCoverLettersDataState({ type: "DELETE_COVER_LETTER", coverLetterId: documentId });

        deleteCoverLetterFromDatabase(documentId);
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
    setIsDropdownCreateDocOpen(prev => !prev);
  }

  // методы
  function createNewResume() {
    const id = generateUUID();
    const resumeData = createDefaultResume(id);

    dispatchOfResumesDataState({ type: "ADD_RESUME", resumeData });
    addResumeToDatabase(resumeData);

    navigate(`/resumes/${id}/edit`);
  }
  function createNewCoverLetter() {
    const id = generateUUID();
    const data = createDefaultCoverLetter(id);

    dispatchOfCoverLettersDataState({ type: "ADD_COVER_LETTER", data  });
    addCoverLetterToDatabase(data);

    navigate(`/cover-letters/${id}/edit`);
  }

  return (
    
    <div>
      <Tabs
        controlsPanel={{
          components: [
            <ButtonAdd
              ref={buttonCreateDocumentRef}
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
          {(!resumes?.length && !coverLetters?.length) && 
            <>
              <NoDocuments
                illustrationSrc={noDocumentsSrc}
                title="Документов нет"
                description="Здесь пока пусто... Добавьте свой первый документ, чтобы начать работу!"
                Control={
                  <ButtonAdd
                    ref={buttonCreateDocumentOnNoDocumentsRef}
                    key="button-add"
                    appearance="bg"
                    callbackOnClick={() => setIsDropdownCreateDocOpenOnNoDocs(prev => !prev)}
                  >
                    Добавить новый документ
                  </ButtonAdd>
                }
              />
              <DropdownMenu
                className={styles.buttonAddDocumentDropdownMenu}
                isOpen={isDropdownCreateDocOpenOnNoDocs}
                setIsOpen={setIsDropdownCreateDocOpenOnNoDocs}
                controls={buttonCreateDocumentControlsData}
                triggerRef={buttonCreateDocumentOnNoDocumentsRef}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              />
            </>
          }
          <DocumentCardList>
            {resumes?.map(resume => {
              return (
                <DocumentCard
                  key={resume.id}
                  data={resume}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("resume", resume.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/resumes/${resume.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("resume", resume.id)}
                />
              );
            })}

            {coverLetters?.map(coverLetter => {
              return (
                <DocumentCard
                  key={coverLetter.id}
                  data={coverLetter}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("coverLetter", coverLetter.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/cover-letters/${coverLetter.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("coverLetter", coverLetter.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
        <TabPanel title="Резюме" id="resumes">
        {(!resumes?.length) && 
            <NoDocuments
              illustrationSrc={noResumeSrc}
              title="Резюме нет"
              description="Здесь пока пусто... Добавьте свое первое резюме, чтобы начать работу!"
              Control={
                <ButtonAdd
                  key="button-add"
                  appearance="bg"
                  callbackOnClick={createNewResume}
                >
                  Добавить новое резюме
                </ButtonAdd>
              }
            />
          }

          <DocumentCardList>
            {resumes?.map(resume => {
              return (
                <DocumentCard
                  key={resume.id}
                  data={resume}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("resume", resume.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/resumes/${resume.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("resume", resume.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
        <TabPanel title="Сопроводительные письма" id="cover-letters">
          {(!coverLetters?.length) && 
            <NoDocuments
              illustrationSrc={noCoverLetterSrc}
              title="Сопроводительных писем нет"
              description="Здесь пока пусто... Добавьте свое первое сопроводительное письмо, чтобы начать работу!"
              Control={
                <ButtonAdd
                  key="button-add"
                  appearance="bg"
                  callbackOnClick={createNewCoverLetter}
                >
                  Добавить новое сопроводительное письмо
                </ButtonAdd>
              }
            />
          }

          <DocumentCardList>
            {coverLetters?.map(coverLetter => {
              return (
                <DocumentCard
                  key={coverLetter.id}
                  data={coverLetter}
                  onChangeTitleCallback={(value) => handleDocumentCardTitleChange("coverLetter", coverLetter.id, "title", value)}
                  onEditButtonClick={() => handleEditButtonClick(`/cover-letters/${coverLetter.id}/edit`)}
                  onDeleteButtonClick={() => handleDeleteButtonClick("coverLetter", coverLetter.id)}
                />
              );
            })}
          </DocumentCardList>
        </TabPanel>
      </Tabs>

      <DropdownMenu
        className={styles.buttonAddDocumentDropdownMenu}
        isOpen={isDropdownCreateDocOpen}
        setIsOpen={setIsDropdownCreateDocOpen}
        controls={buttonCreateDocumentControlsData}
        triggerRef={buttonCreateDocumentRef}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
}