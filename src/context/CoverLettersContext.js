import React, { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { getAllCoverLetters, debounceUpdateCoverLetter, addCoverLetter, deleteCoverLetter, updateCoverLetterField, updateCoverLetterSectionField } from "../api/coverLettersService";
import { createDefaultResume, updateDocumentChangeDate } from "../lib/documentUtils";

const initialState = {
  coverLetters: [],
  isLoading: true,
  loadingState: "beforeLoad",
};

const actionTypes = {
  SET_LOADING_STATE: "SET_LOADING_STATE",
  SET_COVER_LETTERS: "SET_COVER_LETTERS",
  ADD_COVER_LETTER: "ADD_COVER_LETTER",
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
      const { userId, coverLetterId, data, isAddDefaultData } = action;

      if (!draft.coverLetters) draft.coverLetters = [];

      let newData = null;

      if (data) {
        newData = data;
      } else if (isAddDefaultResumeData) {
        newData = createDefaultResume(coverLetterId);
      } else {
        newData = { id: coverLetterId };
      }

      draft.coverLetters.push(newData);

      addCoverLetter(userId, coverLetterId, newData);

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

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        dispatchOfCoverLettersDataState({ type: "SET_LOADING_STATE", state: "loading" });

        const data = await getAllCoverLetters("userId");
        console.log("fetched cover letters data", data);

        dispatchOfCoverLettersDataState({ type: "SET_COVER_LETTERS", coverLetters: data });
        dispatchOfCoverLettersDataState({ type: "SET_LOADING_STATE", state: "loaded" });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoverLetters();

    const handleUnload = () => {
      debounceUpdateCoverLetter.flush();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      debounceUpdateCoverLetter.cancel();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  useEffect(() => {
    const changedCoverLetter = coverLettersDataState.coverLetters.reduce((latest, coverLetter) => {
      if (!coverLetter.changeDate) return latest;

      return !latest || new Date(coverLetter.changeDate) > new Date(latest.changeDate) ? coverLetter : latest;
    }, null);

    changedCoverLetter && debounceUpdateCoverLetter("userId", changedCoverLetter)
  }, [coverLettersDataState.coverLetters]);

  return (
    <CoverLettersContext.Provider
      value={{ coverLettersDataState, dispatchOfCoverLettersDataState }}
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
