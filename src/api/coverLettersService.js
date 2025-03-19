import { db } from "./../../firebase";
import { collection, getDocs, doc, updateDoc, setDoc, getDoc, deleteDoc, addDoc, deleteField } from "firebase/firestore";

export async function getAllCoverLetters(userId) {
  try {
    const coverLettersRef = collection(db, `users/${userId}/coverLetters`);
    const coverLettersSnapshot = await getDocs(coverLettersRef);

    let data = [];

    for (const doc of coverLettersSnapshot.docs) {
      const coverLetterData = doc.data();

      const sectionsRef = collection(doc.ref, "sections");
      const sectionsSnapshot = await getDocs(sectionsRef, { source: "cache" });

      let sections = [];

      for (const sectionDoc of sectionsSnapshot.docs) {
        sections.push({
          id: sectionDoc.id,
          ...sectionDoc.data(),
        });
      }

      data.push({
        id: doc.id,
        ...coverLetterData,
        sections,
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteCoverLetter(userId, coverLetterId) {
  try {
    const docRef = doc(db, `users/${userId}/coverLetters/${coverLetterId}`);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Ошибка при удалении документа:", error);
  }
}
export async function addCoverLetter(userId, coverLetterData) {
  try {
    const docRef = doc(db, `users/${userId}/coverLetters/${coverLetterData.id}`);

    await setDoc(docRef, coverLetterData);
  } catch (error) {
    console.error("Ошибка при добавлении документа:", error);
  }
}
export async function updateCoverLetterField(userId, coverLetterId, key, newValue) {
  try {
    const docRef = doc(db, `users/${userId}/coverLetters/${coverLetterId}`);

    await setDoc(
      docRef,
      {
        [key]: newValue,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function updateCoverLetterSectionField(userId, coverLetterId, sectionId, key, newValue) {
  try {
    const docRef = doc(db, `users/${userId}/coverLetters/${coverLetterId}/sections/${sectionId}`);

    await setDoc(docRef, {
      [key]: newValue,
    }, { merge: true });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}