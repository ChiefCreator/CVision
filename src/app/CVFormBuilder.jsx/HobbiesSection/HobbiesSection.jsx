import styles from "./HobbiesSection.module.scss";

import EditableTitle from "../../EditableTitle/EditableTitle";
import FormFieldText from "../../FormFieldText/FormFieldText";

export default function HobbiesSection({ data, isResumeDataLoaded, handleSectionFieldChange }) {
  const sectionId = "hobbies";

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder="Без названия" fontSize={22} onChangeCallback={(value) => handleSectionFieldChange(sectionId, "title", value)}>
          {isResumeDataLoaded && data?.title}
        </EditableTitle>
      </header>
      <div className={styles.sectionBody}>
        <FormFieldText
          label="Чем вы любите заниматься?"
          placeholder="Расскажите о ваших хобби"
          isContentLoaded={isResumeDataLoaded}
          onChangeCallback={(value) => handleSectionFieldChange(sectionId, "description", value)}
          value={isResumeDataLoaded ? data.description : ""}
        ></FormFieldText>
      </div>
    </div>
  );
}
