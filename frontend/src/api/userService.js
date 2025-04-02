import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


export async function getUser(userId) {
  try {
    const docRef = doc(db, `users/${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { status: "success", user: docSnap.data() };
    }

    return { status: "error", error, message: "Нет пользователя" };
  } catch (error) {
    return { status: "error", error, message: "Ошибка отправки кода" };
  }
}
export async function setUser(userData) {
  try {
    const docRef = doc(db, `users/${userData.uid}`);

    await setDoc(docRef, userData);
    return { status: "success" };
  } catch (error) {
    return { status: "error", error, message: "Ошибка отправки кода" };
  }
}
export async function updateUserField(userId, key, value) {
  try {
    const docRef = doc(db, `users/${userId}`);

    await setDoc(docRef, { [key]: value }, { merge: true });

    return { status: "success" };
  } catch (error) {
    return { status: "error", error };
  }
}