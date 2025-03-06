import styles from "./ProfessionalSummarySection.module.scss";

import EditableTitle from "../../EditableTitle/EditableTitle";
import EditableText from "../../EditableText/EditableText";

export default function ProfessionalSummarySection({ resumeId, isResumeDataLoaded, data, changeField }) {
  const sectionId = "professionalSummary";
  const defaultTitle = "Профессиональное резюме";

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder={defaultTitle} fontSize={22} onChangeCallback={(value) => changeField(sectionId, "title", value)}>{data?.title ?? defaultTitle}</EditableTitle>
        <p className={styles.sectionDescription}>Напишите 2-4 коротких, энергичных предложения о том, какой вы замечательный. Упомяните о своей роли и о том, что вы сделали. Каковы были ваши главные достижения? Опишите свою мотивацию и перечислите свои навыки.</p>
      </header>
      <div className={styles.sectionBody}>
        <EditableText placeholder="Введите описание" isContentLoaded={isResumeDataLoaded} onChangeCallback={(value) => changeField(sectionId, "description", value)}>{data?.description}</EditableText>
      </div>
    </div>
  );
}
