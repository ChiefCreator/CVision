import { Check } from "lucide-react";
import Spinner from "../Spinner/Spinner";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./LoadingStatus.module.scss";

interface LoadingStatusProps extends BaseComponent {
  loadingLabel?: string;
  loadedLabel?: string;
  errorLabel?: string;
  status: "loading" | "loaded" | "error";
}

export default function LoadingStatus({ className, loadingLabel = "Сохранение...", loadedLabel = "Сохранено", errorLabel = "Ошибка", status }: LoadingStatusProps) {
  const isLoading = status === "loading";
  const isLoaded = status === "loaded";

  const getLabel = () => {
    switch(status) {
      case "loading":
        return loadingLabel;
      case "loaded":
        return loadedLabel;
      case "error":
        return errorLabel;
    }
  }

  return (
    <div className={clsx(styles.loadingStatus, className)}>
      <div className={styles.iconWrapper}>
        {isLoading && <Spinner className={styles.spinner} />}
        {isLoaded && <Check className={styles.icon} />}
      </div>
      <span className={styles.label}>{getLabel()}</span>
    </div>
  );
}