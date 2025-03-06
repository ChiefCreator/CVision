import React, { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

const initialState = {
  rect: null,
  state: "full",
};

const actionTypes = {
  SET_STATE: "SET_STATE",
  SET_RECT: "SET_RECT",
};

const asideReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_RECT: {
      draft.rect = action.rect;
      break;
    }
    case actionTypes.SET_STATE: {
      draft.state = action.state;
      break;
    }
    default:
      break;
  }
};

const AsideContext = createContext();

export const AsideProvider = ({ children }) => {
  const [asideState, dispatchOfAsideState] = useImmerReducer(asideReducer, initialState);

  return (
    <AsideContext.Provider value={{ asideState, dispatchOfAsideState }}>
      {children}
    </AsideContext.Provider>
  );
};

export const useAsideContext = () => {
  const context = useContext(AsideContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};
