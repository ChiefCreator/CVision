import React from "react";
import styles from "./LabelValueBlock.module.scss";

export interface LabelValueBlockProps {
  label?: string;
  value?: string;
  isShowLevel?: boolean;
}

export default React.memo(function LabelValueBlock({ label, value, isShowLevel = true }: LabelValueBlockProps) {
  if (!label || !value) return null;

  return (
    <div className={styles.block}>
      <span className={styles.label}>{label}</span>
      {isShowLevel && <span className={styles.value}>{value}</span>}
    </div>
  );
})
