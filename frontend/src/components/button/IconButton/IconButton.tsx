import clsx from "clsx";
import styles from "./IconButton.module.scss";
import { LucideProps } from "lucide-react";


export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;
  iconClassName?: string;
  isActive?: boolean;
}

export default function IconButton({ className, Icon, iconClassName, isActive, type = "button", onClick }: IconButtonProps) {
  return (
    <button className={clsx(styles.button, className, { [styles.buttonActive]: isActive })} type={type} onClick={onClick}>
      {Icon && <Icon className={clsx(styles.icon, iconClassName)} />}
    </button>
  );
}