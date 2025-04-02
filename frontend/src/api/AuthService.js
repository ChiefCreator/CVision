import api from "./api";

import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

export default class AuthService {
  async register(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await updateProfile(user, { displayName: name });

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  };

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
  
      return user;
    } catch (error) {
      throw error;
    }
  };

  async logOut() {
    try {
      await signOut(auth);

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  async sendVerificationCode(email) {
    try {
      const response = await api.post("/auth/send-verification-code", { email });
      return response.data;
    } catch (error) {
      throw error
    }
  };

  async verifyEmailCode(email, code) {
    try {
      const response = await api.post("/auth/verify-email-code", { email, code });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  };

  async verifyUser(email, code) {
    try {
      const response = await api.post("/auth/verify-user", { email, code });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  };
  
  async updateUserProfile(user, profileData) {
    try {
      await updateProfile(user, profileData);
  
      return { status: "success" }
    } catch (error) {
      return { status: "error", error }
    }
  };
  async updateUserAuthEmail(userId, newEmail) {
    try {
      const response = await api.post("/auth/update-user-auth-email", { userId, newEmail });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  };
}