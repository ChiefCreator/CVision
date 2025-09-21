"use client"

import { BaseComponent } from "@/types/root";
import { LucideProps } from "lucide-react";

import clsx from "clsx";
import styles from "./SettingField.module.scss";

interface SettingFieldProps extends BaseComponent {
	Icon?: React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;
  iconClassName?: string;
	title?: string;
	description?: string;
	control: React.ReactNode;
}

export default function SettingField({ className, title, description, Icon, iconClassName, control }: SettingFieldProps) {
	return (
		<div className={clsx(styles.field, className)}>
			<div className={styles.content}>
				{Icon && <Icon className={clsx(styles.icon, iconClassName)} />}

				{title && <span className={styles.title}>{title}</span>} 

				{description && <p className={styles.description}>{description}</p>}
			</div>

			<div className={styles.controlWrapper}>{control}</div>
		</div>
	)
}
