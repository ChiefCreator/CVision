import clsx from "clsx";
import styles from "./IconButton.module.scss";


export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isActive?: boolean;
  iconProps?: {
    className?: string;
    size?: number;
  }
}

export default function IconButton({ className, children, isActive, type = "button", onClick }: IconButtonProps) {
  return (
    <button className={clsx(styles.button, className, { [styles.buttonActive]: isActive })} type={type} onClick={onClick}>
      <div className={styles.buttonIconWrapper}>{children}</div>
    </button>
  );
}