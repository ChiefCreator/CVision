import React, { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

const initialState = {
  isRendered: false,
};

const actionTypes = {
  SET_IS_RENDERED: "SET_IS_RENDERED",
};

const headerReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_RENDERED: {
      draft.isRendered = action.isRendered;
      break;
    }
    default:
      break;
  }
};

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerState, dispatchOfHeaderState] = useImmerReducer(headerReducer, initialState);

  return (
    <HeaderContext.Provider value={{ headerState, dispatchOfHeaderState }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};
