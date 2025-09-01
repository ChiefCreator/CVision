"use client"

import Button from "@/components/button/Button/Button";
import { Check, Info, TriangleAlert, X } from "lucide-react";
import styles from "./Toast.module.scss";

interface ToastProps {
	type: "success" | "error" | "info" | "warning";
	title: string;
	description?: string;
	isIcon?: boolean;
	action?: {
		label: string;
		onClick: () => void;
	}
}

export function Toast({ type, title, description, isIcon = true, action }: ToastProps) {

	const getIcon = () => {
		switch(type) {
			case "success": return <Check className={styles.icon} />;
			case "error": return <X className={styles.icon} />;
			case "info": return <Info className={styles.icon} />;
			case "warning": return <TriangleAlert className={styles.icon} />;
		}
	}

	const handleClickAction = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		action?.onClick();
	}

	return (
		<div className={styles.toast}>
			<div className={styles.content}>
				<header className={styles.head}>
					{isIcon && (
						<div className={styles.iconWrapper}>{getIcon()}</div>
					)}
					<h3 className={styles.title}>{title}</h3>
				</header>

				{description && <p className={styles.description}>{description}</p>}
			</div>

			{action && (
				<div className={styles.action}>
				<Button className={styles.actionButton} type="simpleButton" onClick={handleClickAction}>{action?.label}</Button>
			</div>
			)}
		</div>
	)
}
