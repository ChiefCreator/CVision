import { Check } from "lucide-react";
import Spinner from "../Spinner/Spinner";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./LoadingStatus.module.scss";

interface LoadingStatusProps extends BaseComponent {
	labelClassName?: string;
	iconClassName?: string;
	spinnerClassName?: string;
	loadingLabel?: string;
	loadedLabel?: string;
	errorLabel?: string;
	status: "loading" | "loaded" | "error";
}

export default function LoadingStatus({
	className,
	labelClassName,
	iconClassName,
	spinnerClassName,
	loadingLabel = "Сохранение...",
	loadedLabel = "Сохранено",
	errorLabel = "Ошибка",
	status,
}: LoadingStatusProps) {
	const isLoading = status === "loading";
	const isLoaded = status === "loaded";

	const getLabel = () => {
		switch (status) {
			case "loading":
				return loadingLabel;
			case "loaded":
				return loadedLabel;
			case "error":
				return errorLabel;
		}
	};

	return (
		<div className={clsx(styles.loadingStatus, className)}>
			<div className={styles.iconWrapper}>
				{isLoading && <Spinner className={clsx(styles.spinner, spinnerClassName)} />}
				{isLoaded && <Check className={clsx(styles.icon, iconClassName)} />}
			</div>
			<span className={clsx(styles.label, labelClassName)}>{getLabel()}</span>
		</div>
	);
}
