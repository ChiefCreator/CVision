import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

import { getUser, setUser, updateUserField } from "../api/userService";

const initialState = {
  user: null,
};

const actionTypes = {
  SET_USER_DATA: "SET_USER_DATA",
  UPDATE_USER_FIELD: "UPDATE_USER_FIELD",
  REMOVE_USER: "REMOVE_USER",
};

const UserContext = createContext(null);

const userReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA: {
      draft.user = action.user;
      break;
    }
    case actionTypes.UPDATE_USER_FIELD: {
      const { key, value } = action;

      draft.user[key] = value;

      break;
    }
    case actionTypes.REMOVE_USER: {
      draft.user = null;
    }
    default:
      break;
  }
};

export const UserProvider = ({ children }) => {
  const [userDataState, dispatchOfUserDataState] = useImmerReducer(userReducer, initialState);

  async function setUserDataFromDatabase(userId) {
    const response = await getUser(userId);

    if (response.status === "success") {
      dispatchOfUserDataState({ type: "SET_USER_DATA", user: response.user });
    } else {
      dispatchOfUserDataState({ type: "REMOVE_USER" });
    }
  }
  async function saveUserData(userData) {
    const response = await setUser(userData);

    if (response.status === "success") {
      dispatchOfUserDataState({ type: "SET_USER_DATA", user: userData });
    }
  }
  async function updateUserDataField(userId, key, value) {
    const response = await updateUserField(userId, key, value);

    if (response.status === "success") {
      dispatchOfUserDataState({ type: "UPDATE_USER_FIELD", key, value });
    }

    return response;
  }

  return (
    <UserContext.Provider
      value={{
        userData: userDataState.user,
        dispatchOfUserDataState,
        setUserDataFromDatabase,
        saveUserData,
        updateUserDataField
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
