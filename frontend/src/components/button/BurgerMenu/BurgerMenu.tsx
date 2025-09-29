import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./BurgerMenu.module.scss";

interface BurgerMenu extends BaseComponent {
  isOpen: boolean;
  ref: React.RefObject<HTMLButtonElement | null>;
  toggle: () => void;
}

export default function BurgerMenu({ className, isOpen, ref, toggle }: BurgerMenu) {
  return (
    <button className={clsx(styles.menu, isOpen && styles.open, className)} onClick={toggle} ref={ref}>
      <div className={styles.container}>
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    </button>
  );
}