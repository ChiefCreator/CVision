import React, { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { getAllResumes, debounceUpdateResume } from "../api/resumeService";
import { createDefaultResume, updateDocumentChangeDate } from "../lib/documentUtils";

const initialState = {
  resumes: [],
  isLoading: true,
  loadingState: "beforeLoad",
};

const actionTypes = {
  SET_LOADING_STATE: "SET_LOADING_STATE",
  SET_RESUMES: "SET_RESUMES",
  ADD_RESUME: "ADD_RESUME",
  UPDATE_RESUME_FIELD: "UPDATE_RESUME_FIELD",
  UPDATE_RESUME_SECTION_FIELD: "UPDATE_RESUME_SECTION_FIELD",
  DELETE_RESUME_SECTION_FIELD: "DELETE_RESUME_SECTION_FIELD",
  UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD: "UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD",
  ADD_RESUME_SECTION_CONFIGURABLE_FIELD: "ADD_RESUME_SECTION_CONFIGURABLE_FIELD",
  UPDATE_RESUME_SUB_SECTION_FIELD: "UPDATE_RESUME_SUB_SECTION_FIELD",
  UPDATE_RESUME_SUB_SECTION_DATE_FIELD: "UPDATE_RESUME_SUB_SECTION_DATE_FIELD",
  ADD_RESUME_SUB_SECTION: "ADD_RESUME_SUB_SECTION",
  UPDATE_RESUME_SUB_SECTION_ORDER: "UPDATE_RESUME_SUB_SECTION_ORDER",
  DELETE_RESUME_SUB_SECTION: "DELETE_RESUME_SUB_SECTION",
  DELETE_RESUME_SECTION_CONFIGURABLE_FIELD: "DELETE_RESUME_SECTION_CONFIGURABLE_FIELD",
  DELETE_RESUME: "DELETE_RESUME",
  CLEAR_RESUMES: "CLEAR_RESUMES",
};

const resumeReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_STATE: {
      draft.loadingState = action.state;
      break;
    }
    case actionTypes.SET_RESUMES: {
      draft.resumes = action.resumes;
      break;
    }
    case actionTypes.ADD_RESUME: {
      const { resumeId, resumeData, isAddDefaultResumeData } = action;

      if (!draft.resumes) draft.resumes = [];

      let newResumeData = null;

      if (resumeData) {
        newResumeData = resumeData;
      } else if (isAddDefaultResumeData) {
        newResumeData = createDefaultResume(resumeId);
      } else {
        newResumeData = { id: resumeId };
      }

      draft.resumes.push(newResumeData);

      break;
    }
    case actionTypes.UPDATE_RESUME_FIELD: {
      const { resumeId, key, value } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);
      
      if (resume) {
        resume[key] = value;

        updateDocumentChangeDate(resume);
      }

      break;
    }
    case actionTypes.UPDATE_RESUME_SECTION_FIELD: {
      const { resumeId, sectionId, key, value } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (!resume.sections) resume.sections = [];

      if (!resume.sections.find(section => section.id === sectionId)) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      section[key] = value;

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.DELETE_RESUME_SECTION_FIELD: {
      const { resumeId, sectionId, key } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (!resume.sections) resume.sections = [];

      if (!resume.sections.find(section => section.id === sectionId)) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      delete section[key];

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD: {
      const { resumeId, sectionId, configurableObjectId, key, value } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      const configurableField = section.configurableFields.find(obj => obj.id === configurableObjectId);

      if (configurableField) {
        configurableField[key] = value;

        updateDocumentChangeDate(resume);
      }

      break;
    }
    case actionTypes.ADD_RESUME_SECTION_CONFIGURABLE_FIELD: {
      const { resumeId, sectionId, newConfigurableFieldObject } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      if (section.configurableFields) {
        section.configurableFields.push(newConfigurableFieldObject);
      } else {
        section.configurableFields = [{...newConfigurableFieldObject}];
      }

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.DELETE_RESUME_SECTION_CONFIGURABLE_FIELD: {
      const { resumeId, sectionId, configurableFieldId } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      if (section.configurableFields) {
        section.configurableFields = section.configurableFields.filter(obj => obj.id !== configurableFieldId);

        updateDocumentChangeDate(resume);
      }

      break;
    }
    case actionTypes.UPDATE_RESUME_SUB_SECTION_FIELD: {
      const { resumeId, sectionId, subSectionId, key, value } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      if (section.subSections.length === 0) {
        section.subSections.push({ id: subSectionId });
      }

      const subSection = section.subSections.find((subSection) => subSection.id === subSectionId);

      subSection[key] = value;

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.UPDATE_RESUME_SUB_SECTION_DATE_FIELD: {
      const { resumeId, sectionId, subSectionId, key, value } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      if (section.subSections.length === 0) {
        section.subSections.push({ id: subSectionId });
      }

      const subSection = section.subSections.find((subSection) => subSection.id === subSectionId);

      subSection[key] = value;

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.ADD_RESUME_SUB_SECTION: {
      const { resumeId, sectionId, subSectionId, order, documentFields } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (!resume.sections) resume.sections = [];

      if (!resume.sections.find((section) => section.id === sectionId)) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      if (!section?.subSections) {
        section.subSections = [];
      }

      section.subSections.push({ id: subSectionId, order, ...documentFields });

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.DELETE_RESUME_SUB_SECTION: {
      const { resumeId, sectionId, order } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);
      section.subSections = section.subSections.filter(subSection => subSection.order !== order);
      section.subSections = section.subSections.map(subsection => {     
        return {
          ...subsection,
          order: (subsection.order > order) ? subsection.order - 1 : subsection.order,
        };
      });

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.UPDATE_RESUME_SUB_SECTION_ORDER: {
      const { resumeId, sectionId, data } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);
      const newSubsections = data.map((item, index) => ({ ...item, order: index }));
      section.subSections = newSubsections;

      updateDocumentChangeDate(resume);

      break;
    }
    case actionTypes.DELETE_RESUME: {
      const { resumeId } = action;

      draft.resumes = draft.resumes.filter((resume) => resume.id !== resumeId);

      break;
    }
    case actionTypes.CLEAR_RESUMES: {
      draft.resumes = [];
      break;
    }
    default:
      break;
  }
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumesDataState, dispatchOfResumesDataState] = useImmerReducer(resumeReducer, initialState);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        dispatchOfResumesDataState({ type: "SET_LOADING_STATE", state: "loading" });

        const data = await getAllResumes();
        console.log("fetched resumes data", data);

        dispatchOfResumesDataState({ type: "SET_RESUMES", resumes: data });
        dispatchOfResumesDataState({ type: "SET_LOADING_STATE", state: "loaded" });
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();

    const handleUnload = () => {
      debounceUpdateResume.flush();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      debounceUpdateResume.cancel();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  useEffect(() => {
    const changedResume = resumesDataState.resumes.reduce((latest, resume) => {
      if (!resume.changeDate) return latest;

      return !latest || new Date(resume.changeDate) > new Date(latest.changeDate) ? resume : latest;
    }, null);

    changedResume && debounceUpdateResume("userId", changedResume)
  }, [resumesDataState.resumes]);

  return (
    <ResumeContext.Provider
      value={{ resumesDataState, dispatchOfResumesDataState }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};
