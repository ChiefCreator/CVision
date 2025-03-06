import styles from "./FormFieldText.module.scss";

import EditableText from "../EditableText/EditableText";

export default function FormFieldText({ className = "", label, placeholder, value, onChangeCallback, isContentLoaded }) {

  return (
    <div className={`${styles.formField} ${className}`}>
      <header className={styles.formFieldHeader}>
        <div className={styles.formFieldLabelWrapper}>
          <label className={styles.formFieldLabel}>{label}</label>
        </div>
      </header>
      <EditableText placeholder={placeholder} isContentLoaded={isContentLoaded} onChangeCallback={onChangeCallback}>{isContentLoaded ? value : ""}</EditableText>
    </div>
  );
}
