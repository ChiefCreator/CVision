import React from "react";

import styles from "./LabelValueBlockList.module.scss";

import type { LabelValueBlockProps } from "../LabelValueBlock/LabelValueBlock";
import LabelValueBlock from "../LabelValueBlock/LabelValueBlock";

interface LabelValueBlockListProps {
  data: LabelValueBlockProps[];
  isShowLevel?: boolean;
}

export default React.memo(function LabelValueBlockList({ data, isShowLevel = true }: LabelValueBlockListProps) {
  return (
    <ul className={styles.list}>
      {data.filter(({ value }) => value).map(({ value, label }) => (
        <li key={label}>
          <LabelValueBlock label={label} value={value} isShowLevel={isShowLevel} />
        </li>
      ))}
    </ul>
  );
})