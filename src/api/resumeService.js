import { db } from "./../../firebase";
import { collection, getDocs, doc, updateDoc, setDoc, getDoc, arrayUnion, query, where, orderBy, deleteDoc, arrayRemove, addDoc, deleteField } from "firebase/firestore";
import { convertFromObjectMonthYearFormatToTimestamp, convertFromTimestampToObjectMonthYearFormat, isDateValidMMYYYYFormat } from "../lib/dateUtils";

export async function getAllResumes() {
  try {
    const resumesRef = collection(db, "users/userId/resumes");
    const resumesSnapshot = await getDocs(resumesRef);

    let resumesData = [];

    for (const doc of resumesSnapshot.docs) {
      const resumeData = doc.data();

      const sectionsRef = collection(doc.ref, "sections");
      const sectionsSnapshot = await getDocs(sectionsRef, { source: "cache" });

      let sections = [];

      for (const sectionDoc of sectionsSnapshot.docs) {
        const subSectionsRef = collection(sectionDoc.ref, "subSections");
        const q = query(subSectionsRef, orderBy("order", "asc"));
        const subSectionsSnapshot = await getDocs(q);
        
        let subSections = [];

        for (const subSectionDoc of subSectionsSnapshot.docs) {
          let subSectionData = subSectionDoc.data();

          // Конвертируем поля с timestamp
          Object.keys(subSectionData).forEach((key) => {
            if (subSectionData[key] && subSectionData[key].toDate) {
              subSectionData[key] = convertFromTimestampToObjectMonthYearFormat(subSectionData[key]);
            }
          });

          subSections.push({
            id: subSectionDoc.id,
            ...subSectionData,
          });
        }

        sections.push({
          id: sectionDoc.id,
          ...sectionDoc.data(),
          subSections: subSections,
        });
      }

      resumesData.push({
        id: doc.id,
        ...resumeData,
        sections: sections,
      });
    }

    return resumesData;
  } catch (error) {
    throw error;
  }
}

// resume operations
export async function deleteResume(resumeId) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}`);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Ошибка при удалении документа:", error);
  }
}
export async function addResume(resumeId, resumeData) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}`);
    const sectionsCollection = collection(db, `users/userId/resumes/${resumeId}/sections`);

    const { sections: sectionsData, ...resumeWithoutSections } = resumeData;

    await setDoc(docRef, resumeWithoutSections);
    
    if (Array.isArray(sectionsData)) {
      for (const sectionData of sectionsData) {
        const sectionDocRef = doc(sectionsCollection, sectionData.id);
        await setDoc(sectionDocRef, { title: sectionData.title, order: sectionData.order });
    }
    }
  } catch (error) {
    console.error("Ошибка при добавлении документа:", error);
  }
}
export async function updateResumeField(resumeId, key, newValue) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}`);

    await setDoc(docRef, {
      [key]: newValue,
    }, { merge: true });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function deleteResumeSectionField(resumeId, sectionId, key) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}`);

    await updateDoc(docRef, {
      [key]: deleteField()
    });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}

// sections operations
export async function updateResumeSectionField(resumeId, sectionId, key, newValue) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}`);

    await setDoc(docRef, {
      [key]: newValue,
    }, { merge: true });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function updateResumeSectionConfigurableField(resumeId, sectionId, configurableObjectId, key, newValue) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}`);
    
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Документ не найден");

    const data = docSnap.data();
    const array = data.configurableFields || [];

    const updatedArray = array.map((item) => item.id === configurableObjectId ? { ...item, [key]: newValue } : item);

    await updateDoc(docRef, { configurableFields: updatedArray });
  } catch (error) {
    console.error("Ошибка обновления:", error);
  }
}
export async function addResumeSectionConfigurableField(resumeId, sectionId, newConfigurableFieldObject) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}`);

    await updateDoc(docRef, { configurableFields: arrayUnion(newConfigurableFieldObject) });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function deleteResumeSectionConfigurableField(resumeId, sectionId, configurableFielId) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}`);
    
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Документ не найден");

    const data = docSnap.data();
    const array = data.configurableFields || [];

    const updatedArray = array.filter((item) => item.id !== configurableFielId);

    await updateDoc(docRef, { configurableFields: updatedArray });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}

// subSections operations
export async function setResumeSubSections(resumeId, sectionId, subSectionsData) {
  try {
    const collectionRef = collection(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections`);

    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections`, docSnap.id));
    });

    for (const subSectionData of subSectionsData) {
      try {
        const docRef = await addDoc(collectionRef, subSectionData);
      } catch (error) {
        console.error("Ошибка при добавлении документа: ", error);
      }
    }
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function updateResumeSubSectionField(resumeId, sectionId, subSectionId, key, newValue) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections/${subSectionId}`);

    await setDoc(docRef, {
      [key]: newValue,
    }, { merge: true });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function updateResumeSubSectionDateField(resumeId, sectionId, subSectionId, key, newValue) {
  try {
    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections/${subSectionId}`);

    await setDoc(docRef, {
      [key]: convertFromObjectMonthYearFormatToTimestamp(newValue),
    }, { merge: true });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function addResumeSubSection(resumeId, sectionId, subSectionId, order, documentFields) {
  try {
    const sectionDocRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}`);
    const sectionDocSnapshot = await getDoc(sectionDocRef);

    if (!sectionDocSnapshot.exists()) {
      await setDoc(sectionDocRef, {});
    }

    const docRef = doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections/${subSectionId}`);
    await setDoc(docRef, { order, ...documentFields });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
export async function deleteResumeSubSection(resumeId, sectionId, order) {
  try {
    const collRef = collection(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections`);
    const q = query(collRef, where("order", "==", order));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections/${docSnap.id}`));
    });

    const queryOnSortedOrder = query(collRef, orderBy("order", "asc"));
    const queryOnSortedOrderSnapshot = await getDocs(queryOnSortedOrder);

    queryOnSortedOrderSnapshot.docs.forEach(async (docSnap) => {
      const item = docSnap.data();
      if (item.order > order) {
        await updateDoc(doc(db, `users/userId/resumes/${resumeId}/sections/${sectionId}/subSections/${docSnap.id}`), { order: item.order - 1 });
      }
    });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}

export async function updateWholeFieldInDocument(dbPath, key, newValue) {
  try {
    const docRef = doc(db, dbPath);

    await updateDoc(docRef, {
      [key]: newValue,
    });
  } catch (error) {
    console.error("Ошибка обновления документа:", error);
  }
}
