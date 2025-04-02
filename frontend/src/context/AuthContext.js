import { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import AuthService from "../api/AuthService";

import { useUser } from "./UserContext";

const initialState = {
  user: null,
  loading: true,
};

const actionTypes = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  SET_LOADING: "SET_LOADING",
};

const AuthContext = createContext(null);

const authReducer = (draft, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      draft.user = action.user;
      break;
    }
    case actionTypes.REMOVE_USER: {
      draft.user = null;
      break;
    }
    case actionTypes.SET_LOADING: {
      draft.loading = action.loading;
      break;
    }
    default:
      break;
  }
};

export const AuthProvider = ({ children }) => {
  const [userAuthState, dispatchOfUserAuthState] = useImmerReducer(authReducer, initialState);
  const { dispatchOfUserDataState, setUserDataFromDatabase, saveUserData, updateUserDataField } = useUser();

  const authService = new AuthService();

  async function register(credentials) {
    const { email, password, name, terms, newsletter } = credentials;

    const response = await authService.register(email, password, name);
    if (!response.success) return response;

    const user = response.data;

    dispatchOfUserAuthState({ type: "SET_USER", user });
    await saveUserData({
      uid: user.uid,
        email: user.email,
        name: user.displayName,

        emailVerified: false,

        lastLoginAt: new Date(),
        createdAt: new Date(),
        terms,
        newsletter,
    });

    return response;
  };
  async function loginWithGoogle() {
    try {
      const user = await authService.loginWithGoogle();

      dispatchOfUserAuthState({ type: "SET_USER", user });
  
      await saveUserData({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
  
        emailVerified: true,
  
        lastLoginAt: new Date(),
        createdAt: new Date(),
        terms: true,
        newsletter: false,
      });
    } catch (error) {
      throw error;
    }
  };
  async function sendVerificationCode(email) {
    return await authService.sendVerificationCode(email);
  }
  async function verifyUser(email, code) {
    const response = await authService.verifyUser(email, code);

    if (!response.success) return response;

    dispatchOfUserAuthState({ type: "SET_USER", user: response.data });
    await updateUserDataField(userAuthState.user.uid, "emailVerified", true);

    return response;
  }
  async function verifyEmailCode(email, code) {
    const response = await authService.verifyEmailCode(email, code);

    return response;
  }
  async function updateUserAuthEmail(userId, newEmail) {
    const response = await authService.updateUserAuthEmail(userId, newEmail);

    if (!response.success) return response;

    await updateUserDataField(userId, "email", newEmail);

    return response;
  }
  async function login(email, password) {
    try {
      const user = await authService.login(email, password);
      
      dispatchOfUserAuthState({ type: "SET_USER", user });

      await setUserDataFromDatabase(user.uid);
      await updateUserDataField(user.uid, "lastLoginAt", new Date());

      return user;
    } catch (error) {
      throw error;
    }
  };
  async function logout() {
    const response = await authService.logOut();

    if (!response.success) {
      return response;
    }
      
    dispatchOfUserAuthState({ type: "REMOVE_USER" });
    dispatchOfUserDataState({ type: "REMOVE_USER" });

    return response;
  };

  async function updateProfile(profileData) {
    await authService.updateUserProfile(userAuthState.user, profileData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {
        dispatchOfUserAuthState({ type: "SET_USER", user });

        await setUserDataFromDatabase(user.uid);
      } else {
        dispatchOfUserAuthState({ type: "REMOVE_USER" });
      }

      dispatchOfUserAuthState({ type: "SET_LOADING", loading: false })
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userAuth: userAuthState.user,
        userAuthLoading: userAuthState.loading,
        dispatchOfUserAuthState,
        sendVerificationCode,
        verifyUser,
        verifyEmailCode,
        updateUserAuthEmail,
        register,
        loginWithGoogle,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);












































// import { createContext, useContext, useEffect } from "react";
// import { useImmerReducer } from "use-immer";

// const initialState = {
//   user: null,
// };

// const actionTypes = {
//   SET_USER: "SET_USER",
// };

// const AuthContext = createContext(null);

// const authReducer = (draft, action) => {
//   switch (action.type) {
//     case actionTypes.SET_USER: {
//       draft.user = action.user;
//       break;
//     }
//     default:
//       break;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [userProfileState, dispatchOfUserProfileState] = useImmerReducer(authReducer, initialState);

//   function checkIsUserInStorage() {
//     if (!localStorage.getItem("user")) return false;

//     return JSON.parse(localStorage.getItem("user"))?.email;
//   }

//   useEffect(() => {
//     const userProfile = JSON.parse(localStorage.getItem("user"));

//     dispatchOfUserProfileState({ type: "SET_USER", user: userProfile });
//   }, []);

//   useEffect(() => {
//     if (!userProfileState.user) return;

//     localStorage.setItem("user", JSON.stringify(userProfileState.user));
//   }, [userProfileState.user]);

//   return <AuthContext.Provider value={{ userProfileState, dispatchOfUserProfileState, checkIsUserInStorage }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
