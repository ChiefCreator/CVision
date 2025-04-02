import styles from "./LetterDetailsSection.module.scss";

import EditableText from "../../../EditableText/EditableText";

export default function LetterDetailsSection({ data, isDataLoaded, changeField }) {
  const sectionId = "letterDetails";

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>Подробности письма</h4>
        <p className={styles.sectionDescription}>Напишите 3-4 абзаца, объясняющих, почему вы являетесь идеальным кандидатом на конкретную работу.</p>
      </header>
      <div className={styles.sectionBody}>
        <EditableText placeholder="Введите описание" isContentLoaded={isDataLoaded} onChangeCallback={(value) => changeField(sectionId, "description", value)}>{data?.description}</EditableText>
      </div>
    </div>
  );
}