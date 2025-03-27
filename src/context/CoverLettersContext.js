import React, { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { getAllCoverLetters, debounceUpdateCoverLetter, addCoverLetter, deleteCoverLetter } from "../api/coverLettersService";
import { updateDocumentChangeDate } from "../lib/documentUtils";

import { useAuth } from "./AuthContext";

const initialState = {
  coverLetters: [],
  isLoading: true,
  loadingState: "beforeLoad",
};

const actionTypes = {
  SET_LOADING_STATE: "SET_LOADING_STATE",
  SET_COVER_LETTERS: "SET_COVER_LETTERS",
  ADD_COVER_LETTER: "ADD_COVER_LETTER",
  DELETE_COVER_LETTER: "DELETE_COVER_LETTER",
  UPDATE_COVER_LETTER_FIELD: "UPDATE_COVER_LETTER_FIELD",
  UPDATE_COVER_LETTER_SECTION_FIELD: "UPDATE_COVER_LETTER_SECTION_FIELD",
};

const coverLettersReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_STATE: {
      draft.loadingState = action.state;
      break;
    }
    case actionTypes.SET_COVER_LETTERS: {
      draft.coverLetters = action.coverLetters;
      break;
    }
    case actionTypes.ADD_COVER_LETTER: {
      const { data } = action;

      if (!draft.coverLetters) draft.coverLetters = [];

      draft.coverLetters.push(data);

      break;
    }
    case actionTypes.DELETE_COVER_LETTER: {
      const { coverLetterId } = action;

      draft.coverLetters = draft.coverLetters.filter(item => item.id !== coverLetterId);

      break;
    }
    case actionTypes.UPDATE_COVER_LETTER_FIELD: {
      const { userId, coverLetterId, key, value } = action;

      const coverLetter = draft.coverLetters.find(coverLetter => coverLetter.id === coverLetterId);
      
      if (coverLetter) {
        coverLetter[key] = value;

        updateDocumentChangeDate(coverLetter);
      }

      break;
    }
    case actionTypes.UPDATE_COVER_LETTER_SECTION_FIELD: {
      const { userId, coverLetterId, sectionId, key, value } = action;

      const coverLetter = draft.coverLetters.find(coverLetter => coverLetter.id === coverLetterId);
      
      if (!coverLetter.sections) coverLetter.sections = [];

      if (!coverLetter.sections.find(section => section.id === sectionId)) {
        coverLetter.sections.push({ id: sectionId });
      }

      const section = coverLetter.sections.find((section) => section.id === sectionId);

      section[key] = value;

      updateDocumentChangeDate(coverLetter);

      break;
    }
    default:
      break;
  }
};

const CoverLettersContext = createContext();

export const CoverLettersProvider = ({ children }) => {
  const [coverLettersDataState, dispatchOfCoverLettersDataState] = useImmerReducer(coverLettersReducer, initialState);
  const { userProfileState } = useAuth();
  const { user } = userProfileState;

  async function getCoverLettersFromDatabase() {
    try {
      const data = await getAllCoverLetters(user?.email);
      console.log("fetched cover letters data", data);

      dispatchOfCoverLettersDataState({ type: "SET_COVER_LETTERS", coverLetters: data });
      dispatchOfCoverLettersDataState({ type: "SET_LOADING_STATE", state: "loaded" });
    } catch (error) {
      console.log(error);
    }
  };
  async function addCoverLetterToDatabase(data) {
    addCoverLetter(user?.email, data);
  };
  async function deleteCoverLetterFromDatabase(id) {
    deleteCoverLetter(user?.email, id);
  }
  
  useEffect(() => {
    if (!user?.email) return;

    getCoverLettersFromDatabase();

    const handleUnload = () => {
      debounceUpdateCoverLetter.flush();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      debounceUpdateCoverLetter.cancel();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user?.email]);
  useEffect(() => {
    if (!user?.email) return;

    const changedCoverLetter = coverLettersDataState.coverLetters.reduce((latest, coverLetter) => {
      if (!coverLetter.changeDate) return latest;

      return !latest || new Date(coverLetter.changeDate) > new Date(latest.changeDate) ? coverLetter : latest;
    }, null);

    changedCoverLetter && debounceUpdateCoverLetter(user?.email, changedCoverLetter)
  }, [coverLettersDataState.coverLetters]);

  return (
    <CoverLettersContext.Provider
      value={{ coverLettersDataState, dispatchOfCoverLettersDataState, addCoverLetterToDatabase, deleteCoverLetterFromDatabase }}
    >
      {children}
    </CoverLettersContext.Provider>
  );
};

export const useCoverLetters = () => {
  const context = useContext(CoverLettersContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};
