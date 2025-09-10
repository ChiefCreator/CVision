"use client"

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./MobilePopover.module.scss";

interface PopoverProps extends BaseComponent {
	children: React.ReactNode;
	id?: string;
}

export function MobilePopover({ id, className, children }: PopoverProps) {
	return (
		<div className={clsx(styles.popover, className)} id={id}>{children}</div>
	)
}
