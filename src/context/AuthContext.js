import { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

const initialState = {
  user: null,
};

const actionTypes = {
  SET_USER: "SET_USER",
};

const AuthContext = createContext(null);

const authReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      draft.user = action.user;
      break;
    }
    default:
      break;
  }
};

export const AuthProvider = ({ children }) => {
  const [userProfileState, dispatchOfUserProfileState] = useImmerReducer(authReducer, initialState);

  function checkIsUserInStorage() {
    if (!localStorage.getItem("user")) return false;

    return JSON.parse(localStorage.getItem("user"))?.email;
  }

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("user"));

    dispatchOfUserProfileState({ type: "SET_USER", user: userProfile });
  }, []);

  useEffect(() => {
    if (!userProfileState.user) return;

    localStorage.setItem("user", JSON.stringify(userProfileState.user));
  }, [userProfileState.user]);

  return <AuthContext.Provider value={{ userProfileState, dispatchOfUserProfileState, checkIsUserInStorage }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
