import Spinner from "../Spinner/Spinner";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./Loader.module.scss";

interface LoaderProps extends BaseComponent {
  label?: string;
  isLoading: boolean;
}

export default function Loader({ className, label = "Загрузка...", isLoading }: LoaderProps) {
  console.log(isLoading);
	if (!isLoading) return;
	
  return (
    <div className={clsx(styles.loader, className)}>
      <Spinner className={styles.spinner} />

      <span className={styles.label}>{label}</span>
    </div>
  );
}