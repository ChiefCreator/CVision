"use client"


import clsx from "clsx";
import { Check } from "lucide-react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	label?: React.ReactNode;
	value: boolean;

	onChange: (val: boolean) => void;
}

export function Checkbox({ className, value: isActive, label, onChange }: CheckboxProps) {
	const toggle = () => onChange?.(!isActive);
	
	return (
		<div className={clsx(styles.checkbox, className)}>
			<button
				className={styles.box}
				type="button"

				onClick={toggle}
			>
				{isActive && <Check className={styles.boxCheck} />}
			</button>

			{label && <label className={styles.labelWrapper} onClick={toggle}>{label}</label>}
		</div>
	)
}

