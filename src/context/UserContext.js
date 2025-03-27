import { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { getUser, setNewUser } from "../api/authentication";

import { useAuth } from "./AuthContext";

const initialState = {
  user: null,
};

const actionTypes = {
  SET_USER: "SET_USER",
};

const UserContext = createContext(null);

const userReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      draft.user = action.user;
      break;
    }
    default:
      break;
  }
};

export const UserProvider = ({ children }) => {
  const [userDataState, dispatchOfUserDataState] = useImmerReducer(userReducer, initialState);

  const { userProfileState } = useAuth();

  async function getUserFromDatabase(email = null) {
    if (!email && userProfileState.user?.email) {
      const user = await getUser(userProfileState.user.email);

      dispatchOfUserDataState({ type: "SET_USER", user });
    } else {
      const user = await getUser(email);

      dispatchOfUserDataState({ type: "SET_USER", user });

      return user;
    }
  }
  async function setUserToDatabase() {
    if (userDataState.user?.email) {
      const user = await setNewUser(userDataState.user);
    }
  }


  useEffect(() => {
    getUserFromDatabase();
  }, []);
  useEffect(() => {
    setUserToDatabase();
  }, [userDataState.user]);

  return <UserContext.Provider value={{ userDataState, dispatchOfUserDataState, getUserFromDatabase }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
