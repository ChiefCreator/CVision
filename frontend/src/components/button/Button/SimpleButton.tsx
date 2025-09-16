import type { SimpleButtonProps } from "./Button";

import clsx from "clsx";
import styles from "./Button.module.scss";

export default function SimpleButton({ variant, className, children, Icon, iconClassName, actionType, onClick }: SimpleButtonProps) {
  return (
    <button className={clsx(styles.button, className)} type={actionType} onClick={onClick} data-variant={variant}>
      {Icon && <Icon className={clsx(styles.icon, iconClassName)} aria-hidden="true" />}

      {children}
    </button>
  );
}