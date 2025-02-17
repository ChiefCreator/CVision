import styles from "./MonthRangeFormField.module.scss";

import InputDate from "../InputDate/InputDate";

export default function MonthRangeFormField({ className = "", label, startInputData, endInputData }) {
  return (
    <div className={`${styles.formField} ${className}`}>
      <header className={styles.formFieldHeader}>
        <div className={styles.formFieldLabelWrapper}>
          <label className={styles.formFieldLabel}>{label}</label>
        </div>
      </header>
      <div className={styles.formFieldInputsWrapper}>
        <InputDate value={startInputData.value} placeholder={startInputData.placeholder} />
        {/* <InputDate value={endInputData.value} placeholder={endInputData.placeholder} /> */}
      </div>
    </div>
  );
}
