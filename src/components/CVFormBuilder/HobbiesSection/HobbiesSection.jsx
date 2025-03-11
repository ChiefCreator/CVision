import styles from "./HobbiesSection.module.scss";

import EditableTitle from "../../EditableTitle/EditableTitle";
import FormFieldText from "../../FormFieldText/FormFieldText";
import { useEffect } from "react";

export default function HobbiesSection({ data, isResumeDataLoaded, handleSectionFieldChange }) {
  const sectionId = "hobbies";
  const defaultTitle = "Хобби";

  useEffect(() => {
    handleSectionFieldChange(sectionId, "title", defaultTitle);
  }, []);

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder={data?.title} fontSize={22} onChangeCallback={(value) => handleSectionFieldChange(sectionId, "title", value)}>
          {data?.title}
        </EditableTitle>
      </header>
      <div className={styles.sectionBody}>
        <FormFieldText
          label="Чем вы любите заниматься?"
          placeholder="Расскажите о ваших хобби"
          isContentLoaded={isResumeDataLoaded}
          onChangeCallback={(value) => handleSectionFieldChange(sectionId, "description", value)}
          value={data?.description}
        ></FormFieldText>
      </div>
    </div>
  );
}
