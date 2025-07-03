import { BaseComponent } from "@/types/rootTypes";

import styles from "./InputLine.module.scss";
import clsx from "clsx";

interface InputLineProps extends BaseComponent {
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function InputLine({ className, ref }: InputLineProps) {
  return (
    <div className={clsx(styles.line, className)} ref={ref}>
      <span className={styles.subLine}></span>
      <span className={styles.subLine}></span>
    </div>
  );
}