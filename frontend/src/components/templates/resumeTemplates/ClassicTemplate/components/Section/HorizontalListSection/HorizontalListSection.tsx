import type { HorizontalListSectionProps } from "../Section";

import styles from "./HorizontalListSection.module.scss";
import baseStyles from "./../Section.module.scss";
import clsx from "clsx";

export default function HorizontalListSection({ className, title, children }: HorizontalListSectionProps) {
  return (
    <div className={clsx(baseStyles.section, styles.section, className)}>
      {title && <h2 className={clsx(baseStyles.title, styles.title)}>{title}</h2>}

      <div className={clsx(baseStyles.content, styles.content)}>{children}</div>
    </div>
  );
}