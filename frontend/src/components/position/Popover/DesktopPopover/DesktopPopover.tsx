"use client"

import { BaseComponent } from "@/types/root";
import Portal from "../../Portal/Portal";
import Positioner, { PositionerProps } from "../../Positioner/Positioner";

import clsx from "clsx";
import styles from "./DesktopPopover.module.scss";

interface PopoverProps extends BaseComponent {
	id?: string;
	children: React.ReactNode;
	positioner: PositionerProps;
}

export function DesktopPopover({ id, className, children, positioner }: PopoverProps) {
	return (
		<Portal>
			<Positioner {...positioner}>
				<div className={clsx(styles.popover, className)} id={id} ref={positioner.contentRef as any}>{children}</div>
			</Positioner>
		</Portal>
	)
}
