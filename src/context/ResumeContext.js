import React, { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { getAllResumes, updateResumeSectionField, updateResumeSectionConfigurableField, addResumeSectionConfigurableField, deleteResumeSectionConfigurableField, updateResumeSubSectionField, addResumeSubSection, deleteResumeSubSection, setResumeSubSections } from "../api/resumeService";

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
  UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD: "UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD",
  ADD_RESUME_SECTION_CONFIGURABLE_FIELD: "ADD_RESUME_SECTION_CONFIGURABLE_FIELD",
  UPDATE_RESUME_SUB_SECTION_FIELD: "UPDATE_RESUME_SUB_SECTION_FIELD",
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
      draft.resumes.push(action.resume);
      break;
    }
    case actionTypes.UPDATE_RESUME_FIELD: {
      const { id, path, key, value, dbPath } = action;

      const resume = draft.resumes.find((resume) => resume.id === id);

      if (resume) {
        let current = resume;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;

        updateWholeFieldInDocument(dbPath, key, value);
      }
      break;
    }
    case actionTypes.UPDATE_RESUME_SECTION_FIELD: {
      const { resumeId, sectionId, key, value } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      section[key] = value;

      updateResumeSectionField(resumeId, sectionId, key, value);

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
        updateResumeSectionConfigurableField(resumeId, sectionId, configurableObjectId, key, value);
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

      addResumeSectionConfigurableField(resumeId, sectionId, newConfigurableFieldObject);

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
        deleteResumeSectionConfigurableField(resumeId, sectionId, configurableFieldId);
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

      updateResumeSubSectionField(resumeId, sectionId, subSectionId, key, value);

      break;
    }
    case actionTypes.ADD_RESUME_SUB_SECTION: {
      const { resumeId, sectionId, subSectionId, order, documentFields } = action;

      const resume = draft.resumes.find((resume) => resume.id === resumeId);

      if (resume.sections.length === 0) {
        resume.sections.push({ id: sectionId });
      }

      const section = resume.sections.find((section) => section.id === sectionId);

      if (!section.subSections) {
        section.subSections = [];
      }

      section.subSections.push({ id: subSectionId, order, ...documentFields });

      addResumeSubSection(resumeId, sectionId, subSectionId, order, documentFields);

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

      deleteResumeSubSection(resumeId, sectionId, order);

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

      setResumeSubSections(resumeId, sectionId, newSubsections);

      break;
    }
    case actionTypes.DELETE_RESUME: {
      draft.resumes = draft.resumes.filter((resume) => resume.id !== action.id);
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
  }, []);

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
