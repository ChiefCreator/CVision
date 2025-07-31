import { BaseComponent } from "@/types/root";
import styles from "./Spinner.module.scss";
import clsx from "clsx";

interface SpinnerProps extends BaseComponent {}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div className={clsx(styles.spinner, className)}></div>
  );
}