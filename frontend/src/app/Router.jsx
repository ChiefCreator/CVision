import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useResumeContext } from "../context/ResumeContext";
import { useCoverLetters } from "../context/CoverLettersContext";

import { createDefaultResume, createDefaultCoverLetter } from "../lib/documentUtils";
import { generateUUID } from "../lib/mathUtils";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import SettingsLayout from "../layouts/SettingsLayout/SettingsLayout";
import GeneralSettings from "../pages/GeneralSettings/GeneralSettings";
import Dashboard from "../pages/Dashboard/Dashboard";
import Documents from "../pages/Documents/Documents";
import AccountSettings from "../pages/AccountSettings/AccountSettings";
import CreateResume from "../pages/CreateResume/CreateResume";
import EditCoverLetter from "../pages/EditCoverLetter/EditCoverLetter";

export default function Router() {
  const navigate = useNavigate();

  const { resumesDataState, dispatchOfResumesDataState, addResumeToDatabase, deleteResumeFromDatabase } = useResumeContext();
  const { resumes } = resumesDataState;

  const { coverLettersDataState, dispatchOfCoverLettersDataState, addCoverLetterToDatabase, deleteCoverLetterFromDatabase } = useCoverLetters();
  const { coverLetters } = coverLettersDataState;

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
  function duplicateDocument(documentType, documentData) {
    const duplicatedDocument = {
      ...documentData,
      id: generateUUID(),
      changeDate: new Date(),
      creationDate: new Date(),
    };

    switch(documentType) {
      case "resume":
        dispatchOfResumesDataState({ type: "ADD_RESUME", resumeData: duplicatedDocument });
        addResumeToDatabase(duplicatedDocument);
        break;
      case "coverLetter":
        dispatchOfCoverLettersDataState({ type: "ADD_COVER_LETTER", data: duplicatedDocument });
        addCoverLetterToDatabase(duplicatedDocument);
        break;
    }
  }

  return (
    <Routes future={{ v7_relativeSplatPath: true }}>

      <Route path="auth" element={<AuthLayout />}> 
        <Route index element={<Navigate to="login" />} />

        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/" element={<HomeLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route
            path="resumes"
            element={
              <Documents
                type="resume"
                documents={resumes}
                changeCardTitle={handleDocumentCardTitleChange}
                clickEditButton={handleEditButtonClick}
                clickDeleteButton={handleDeleteButtonClick}
                clickAddButton={createNewResume}
                duplicateDocument={duplicateDocument}
              />
            } 
          />
          <Route
            path="cover-letters"
            element={
              <Documents
                type="cover-letter"
                documents={coverLetters}
                changeCardTitle={handleDocumentCardTitleChange}
                clickEditButton={handleEditButtonClick}
                clickDeleteButton={handleDeleteButtonClick}
                clickAddButton={createNewCoverLetter}
                duplicateDocument={duplicateDocument}
              />
            } 
          />

          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="general" />} />

            <Route path="general" element={<GeneralSettings />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
        </Route>
      </Route>

      <Route path="resumes/:resumeId/edit" element={<CreateResume />} />
      <Route path="cover-letters/:coverLetterId/edit" element={<EditCoverLetter />} />

    </Routes>
  );
}