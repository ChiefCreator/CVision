import { db } from "./../../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { debounce } from "lodash";
import { convertFromTimestampToDate, convertFromDateToTimestamp } from "../lib/dateUtils";

export async function getAllCoverLetters(userId) {
  try {
    const coverLettersRef = collection(db, `users/${userId}/coverLetters`);
    const coverLettersSnapshot = await getDocs(coverLettersRef);

    let data = [];

    for (const doc of coverLettersSnapshot.docs) {
      const coverLetterData = doc.data();

      coverLetterData.creationDate = coverLetterData.creationDate ? convertFromTimestampToDate(coverLetterData.creationDate) : null;
      coverLetterData.changeDate = coverLetterData.changeDate ? convertFromTimestampToDate(coverLetterData.changeDate) : null;
      

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
export async function updateCoverLetter(userId, coverLetterData) {
  const batch = writeBatch(db);

  const { sections, id: coverLetterId, ...coverLetterDocumentData } = coverLetterData;

  coverLetterDocumentData.creationDate = coverLetterDocumentData.creationDate ? convertFromDateToTimestamp(coverLetterDocumentData.creationDate) : null;
  coverLetterDocumentData.changeDate = coverLetterDocumentData.changeDate ? convertFromDateToTimestamp(coverLetterDocumentData.changeDate) : null;

  const coverLetterRef = doc(db, `users/${userId}/coverLetters/${coverLetterId}`);
  batch.set(coverLetterRef, coverLetterDocumentData);

  sections?.forEach(section => {
    const { id: sectionId, ...sectionDocumentData } = section;

    const sectionRef = doc(coverLetterRef, `sections/${sectionId}`);
    batch.set(sectionRef, sectionDocumentData);
  });

  try {
    await batch.commit();
  } catch (error) {
    console.error("Ошибка при обновлении резюме:", error);
  }
}
export const debounceUpdateCoverLetter = debounce(async (userId, coverLetterData) => {
  await updateCoverLetter(userId, coverLetterData);
}, 5000); 


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
    const sectionsCollection = collection(docRef, "sections");

    const { sections: sectionsData, ...coverLetterDocumentData } = coverLetterData;

    coverLetterDocumentData.creationDate = convertFromDateToTimestamp(coverLetterDocumentData.creationDate);

    await setDoc(docRef, coverLetterDocumentData);
    
    sectionsData?.forEach(async sectionData => {
      const sectionDoc = doc(sectionsCollection, sectionData.id);
      await setDoc(sectionDoc, sectionData);
    })
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