import clsx from "clsx";
import styles from "./A4.module.scss";

interface A4Props {
  children: React.ReactNode;
  className?: string;
}

export default function A4({ className, children }: A4Props) {
  return (
    <div className={clsx(styles.a4, className)}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}