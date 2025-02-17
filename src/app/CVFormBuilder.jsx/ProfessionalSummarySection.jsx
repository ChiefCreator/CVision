import styles from "./ProfessionalSummarySection.module.scss";

import EditableTitle from "../EditableTitle/EditableTitle";
import EditableText from "../EditableText/EditableText";

import { useResumeContext } from "../../context/ResumeContext";

export default function ProfessionalSummarySection() {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === "resume#1");
  const resumeSectionData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "professionalSummary");
  
   // обработчики
   function handleEditableTitleChange(value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SECTION_FIELD",
      resumeId: resumeData.id,
      sectionId: "professionalSummary",
      key: "description",
      value: value,
    })
  }

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder="Без названия" fontSize={22}>Профессиональное резюме</EditableTitle>
        <p className={styles.sectionDescription}>Напишите 2-4 коротких, энергичных предложения о том, какой вы замечательный. Упомяните о своей роли и о том, что вы сделали. Каковы были ваши главные достижения? Опишите свою мотивацию и перечислите свои навыки.</p>
      </header>
      <div className={styles.sectionBody}>
        <EditableText placeholder="Введите описание" isContentLoaded={isResumeDataLoaded} onChangeCallback={(value) => handleEditableTitleChange(value)}>{isResumeDataLoaded ? resumeSectionData.description : ""}</EditableText>
      </div>
    </div>
  );
}
