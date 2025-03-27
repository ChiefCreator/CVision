import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./../../firebase";

import { generateVerificationCode } from "../lib/mathUtils";

export async function sendVerificationCode(email) {
  const code = generateVerificationCode();
  const expirationTime = Date.now() + 3 * 60 * 1000;
  
  try {
    const docRef = doc(db, "email_verifications", email);
    await setDoc(docRef, { code, expiresAt: expirationTime });
  
    // await sendEmail(email, code);
    return { status: "success" };
  } catch (error) {
    return { status: "error", error, message: "Ошибка отправки кода" };
  }
};

export async function verifyCode(email, enteredCode) {
  const docRef = doc(db, "email_verifications", email);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return { success: false, message: "Код не найден." };
  }
  
  const { code, expiresAt } = docSnap.data();
  
  if (Date.now() > expiresAt) {
    return { success: false, message: "Код истёк." };
  }
  
  if (code !== enteredCode) {
    return { success: false, message: "Неверный код." };
  }
  
  return { success: true, message: "Код подтверждён!" };
};

export async function registerUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    return { status: "success", user };
  } catch (error) {
    console.error("Ошибка регистрации:", error.message);

    return { status: "error", error: getFirebaseErrorMessage(error.code) };
  }
};
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return { status: "success", user };
  } catch (error) {
    return { status: "error", error: getFirebaseErrorMessage(error.code) };
  }
}
export async function updateUserProfile(user, newData) {
  try {
    await user.updateProfile(newData);

    return { status: "success", user };
  } catch (error) {
    return { status: "error", error };
  }
}

export async function getUser(email) {
  try {
    const docRef = doc(db, `users/${email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    return { status: "error", error, message: "Ошибка отправки кода" };
  }
}
export async function setNewUser(userData) {
  try {
    const docRef = doc(db, `users/${userData.email}`);

    await setDoc(docRef, userData);
    return { status: "success" };
  } catch (error) {
    return { status: "error", error, message: "Ошибка отправки кода" };
  }
}

function getFirebaseErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Этот email уже используется.";
    case "auth/weak-password":
      return "Пароль слишком слабый. Минимум 6 символов.";
    case "auth/invalid-email":
      return "Некорректный email.";
    default:
      return "Произошла ошибка. Попробуйте снова.";
  }
};
