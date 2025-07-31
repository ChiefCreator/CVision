import type { SimpleButtonProps } from "./Button";

import styles from "./Button.module.scss";
import clsx from "clsx";

export default function SimpleButton({ className, children, Icon, iconClassName, actionType, onClick }: SimpleButtonProps) {
  return (
    <button className={clsx(styles.button, className)} type={actionType} onClick={onClick}>
      {Icon && <Icon className={clsx(styles.icon, iconClassName)} aria-hidden="true" />}

      {children}
    </button>
  );
}