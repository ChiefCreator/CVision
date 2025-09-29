"use client"

import { BaseComponent } from "@/types/root";
import Portal from "../Portal/Portal";
import Positioner, { PositionerProps } from "../Positioner/Positioner";

import clsx from "clsx";
import styles from "./Popover.module.scss";

export interface PopoverProps extends BaseComponent {
	id?: string;
	isOpen: boolean;
	children: React.ReactNode;
	positioner: PositionerProps;
}

export default function Popover({ id, isOpen, className, children, positioner }: PopoverProps) {
	if (!isOpen) return;

	return (
		<Portal>
			<Positioner {...positioner}>
				<div className={clsx(styles.popover, className)} id={id} ref={positioner.contentRef as any}>{children}</div>
			</Positioner>
		</Portal>
	)
}
