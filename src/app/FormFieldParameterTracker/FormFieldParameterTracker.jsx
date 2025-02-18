import styles from "./FormFieldParameterTracker.module.scss";

import { useRef } from "react";

import ParameterTracker from "../ParameterTracker/ParameterTracker";

export default function FormFieldParameterTracker({ className = "", label, parameters, selectedParameterId, onSelectCallback }) {
  const selectedParameterData = parameters.find(parameter => parameter.id === selectedParameterId);

  return (
    <div className={`${styles.formField} ${className}`}>
      <header className={styles.formFieldHeader}>
        <div className={styles.formFieldLabelWrapper}>
          <label className={styles.formFieldLabel}>{label} - <span className={styles.formFieldLabelLevel} data-theme={selectedParameterData.colorTheme}>{selectedParameterData.title}</span></label>
        </div>
      </header>
      <ParameterTracker parameters={parameters} selectedParameterId={selectedParameterId} onSelectCallback={onSelectCallback} />
    </div>
  );
}
