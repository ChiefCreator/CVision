import type { ColumnListSectionProps } from "../Section";

import baseStyles from "./../Section.module.scss";
import styles from "./ColumnListSection.module.scss";
import clsx from "clsx";

export default function ColumnListSection({ className, title, children, id, name }: ColumnListSectionProps) {
  return (
    <div className={clsx(baseStyles.section, styles.section, className)} data-section-id={id} data-section-name={name}>
      {title && <h2 className={clsx(baseStyles.title, styles.title)}>{title}</h2>}

      <div className={clsx(baseStyles.content, styles.content)}>{children}</div>
    </div>
  );
}