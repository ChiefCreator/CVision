import { createContext, useContext, useState } from "react";
import { useImmerReducer } from "use-immer";

const initialState = {
  isOpen: false,
  loadingStageOfCroppedImage: "none",
};

const actionTypes = {
  SET_IS_OPEN: "SET_IS_OPEN",
  SET_LOADING_STAGE_OF_CROPPED_IMAGE: "SET_LOADING_STAGE_OF_CROPPED_IMAGE" 
};

const reducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_OPEN: {
      draft.isOpen = action.isOpen;
      break;
    }
    case actionTypes.SET_LOADING_STAGE_OF_CROPPED_IMAGE: {
      draft.loadingStageOfCroppedImage = action.loadingStage;
      break;
    }
    default:
      break;
  }
};

const ImageManagerContext = createContext();

export function ImageManagerProvider({ children }) {
  const [imageManagerState, dispatchOfImageManagerState] = useImmerReducer(reducer, initialState);

  return <ImageManagerContext.Provider value={{ imageManagerState, dispatchOfImageManagerState }}>{children}</ImageManagerContext.Provider>;
}

export function useImageManagerContext() {
  return useContext(ImageManagerContext);
}
