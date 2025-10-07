"use client";

import { BaseComponent } from "@/types/root";
import Portal, { PortalProps } from "../Portal/Portal";
import Positioner, { PositionerProps } from "../Positioner/Positioner";

import { PopoverVariant } from "@/types/position/popoverVariant";
import clsx from "clsx";
import styles from "./Popover.module.scss";

export interface PopoverProps extends BaseComponent {
	id?: string;
	isOpen: boolean;
	variant?: PopoverVariant;
	children: React.ReactNode;
	positioner: PositionerProps;
	portal?: Omit<PortalProps, "children">;
}

export default function Popover({
	id,
	isOpen,
	variant = "primary",
	className,
	children,
	positioner,
	portal,
}: PopoverProps) {
	if (!isOpen) return;

	return (
		<Portal {...portal}>
			<Positioner {...positioner}>
				<div
					className={clsx(styles.popover, className)}
					id={id}
					ref={positioner.contentRef as any}
					data-variant={variant}
				>
					<div className={styles.container}>
						{children}
					</div>
				</div>
			</Positioner>
		</Portal>
	);
}
