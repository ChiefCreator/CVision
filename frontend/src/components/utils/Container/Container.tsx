import type { BaseComponent } from "@/types/root";

import styles from "./Container.module.scss";
import clsx from "clsx";

interface ContainerProps extends BaseComponent {
  children: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {

  return (
    <div className={clsx(styles.container, className)}>{children}</div>
  );
}
