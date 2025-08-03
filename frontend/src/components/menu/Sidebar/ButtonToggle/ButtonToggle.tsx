import { ChevronLeft } from "lucide-react";

import styles from "./ButtonToggle.module.scss";
import clsx from "clsx";
import { BaseComponent } from "@/types/root";

interface ButtonToggleProps extends BaseComponent {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ButtonToggle({ className, isOpen, onToggle }: ButtonToggleProps) {
  return (
    <button className={clsx(styles.button, className, isOpen && styles.buttonOpen)} type="button" onClick={onToggle}>
      <span className={styles.rect}></span>
  
      <ChevronLeft className={styles.arrow} />
    </button>
  );
}