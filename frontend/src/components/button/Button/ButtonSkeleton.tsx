import { BaseComponent } from "@/types/root";
import Skeleton from "react-loading-skeleton";

import clsx from "clsx";
import styles from "./Button.module.scss";

interface ButtonSkeletonProps extends BaseComponent {
  containerClassName?: string;
}

export default function ButtonSkeleton({ className, containerClassName, style = {} }: ButtonSkeletonProps) {
  return (
    <Skeleton
      className={clsx(styles.button, className)}
      containerClassName={containerClassName}
      style={{ width: "150px", backgroundColor: "var(--base-color)", cursor: "initial", ...style }}
    />
  );
}