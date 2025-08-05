import { LucideProps } from "lucide-react";
import styles from "./ActionButton.module.scss";
import clsx from "clsx";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;
  iconClassName?: string;
  children: string;
}

export default function ActionButton({ className, iconClassName, children, Icon, onClick }: ActionButtonProps) {
  return (
    <button className={clsx(styles.button, className)} type="button" onClick={onClick}>
      {Icon && <Icon className={clsx(styles.icon, iconClassName)} />}

      <span className={styles.title}>{children}</span>
    </button>
  );
}