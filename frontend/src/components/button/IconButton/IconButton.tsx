import clsx from "clsx";
import styles from "./IconButton.module.scss";


export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  iconProps: {
    className?: string;
    size?: number;
  }
}

export default function IconButton({ className, children, type = "button", onClick }: IconButtonProps) {
  return (
    <button className={clsx(styles.button, className)} type={type} onClick={onClick}>
      <div className={styles.iconWrapper}>{children}</div>
    </button>
  );
}