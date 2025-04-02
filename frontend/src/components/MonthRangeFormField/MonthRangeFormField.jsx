import styles from "./MonthRangeFormField.module.scss";

import InputDate from "../InputDate/InputDate";

export default function MonthRangeFormField({ className = "", label, startDate, endDate, onChangeStartInputCallback, onChangeEndInputCallback }) {
  return (
    <div className={`${styles.formField} ${className}`}>
      <header className={styles.formFieldHeader}>
        <div className={styles.formFieldLabelWrapper}>
          <label className={styles.formFieldLabel}>{label}</label>
        </div>
      </header>
      <div className={styles.formFieldInputsWrapper}>
        <InputDate date={startDate.value} changeDate={onChangeStartInputCallback} calendarPosRegardingInputDate={{ left: 0, top: ["100%", 10] }} />
        <InputDate date={endDate.value} changeDate={onChangeEndInputCallback} calendarPosRegardingInputDate={{ left: 0, top: ["100%", 10] }} />
      </div>
    </div>
  );
}
