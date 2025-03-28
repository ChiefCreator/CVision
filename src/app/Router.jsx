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
import Dashboard from "../pages/Dashboard/Dashboard";
import Documents from "../pages/Documents/Documents";
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
              />
            } 
          />
          <Route path="settings" element={<div>Настройки</div>} />
        </Route>
      </Route>

      <Route path="resumes/:resumeId/edit" element={<CreateResume />} />
      <Route path="cover-letters/:coverLetterId/edit" element={<EditCoverLetter />} />

    </Routes>
  );
}