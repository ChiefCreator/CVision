import clsx from "clsx";
import styles from "./Toggle.module.scss";

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  isActive?: boolean;
  label?: string;

  onChange?: (isActive: boolean) => void;
}

export default function Toggle({ isActive = true, label, onChange }: ToggleProps) {
  const handleClick = () => {
    onChange?.(!isActive);
  }

  return (
    <div className={clsx(styles.toggle, isActive && styles.toggleActive)}>
      <button className={clsx(styles.toggleButton, isActive && styles.toggleButtonActive)} type="button" onClick={handleClick} id="button">
        <span className={clsx(styles.circle, isActive && styles.circleActive)}></span>
      </button>

      {label && <label className={styles.label} htmlFor="button">{label}</label>}
    </div>
  );
}