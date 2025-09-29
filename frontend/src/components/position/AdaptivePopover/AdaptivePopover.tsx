"use client";

import { useMediaQuery } from "react-responsive";

import Drawer, { DrawerProps } from "../Drawer/Drawer";
import Popover, { PopoverProps } from "../Popover/Popover";

export type AdaptivePopoverProps = PopoverProps & DrawerProps;

export default function AdaptivePopover({
	className,
	id,
	isOpen,
	children,

	positioner,

	title,
	hasBackButton,
	hasCloseButton,
	onClose,
	onBack,
}: AdaptivePopoverProps) {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	if (isMobile)
		return (
			<Drawer
				className={className}
				id={id}
				isOpen={isOpen}
				title={title}
				hasBackButton={hasBackButton}
				hasCloseButton={hasCloseButton}
				
				onClose={onClose}
				onBack={onBack}
			>
				{children}
			</Drawer>
		);

	return (
		<Popover className={className} id={id} isOpen={isOpen} positioner={positioner}>
			{children}
		</Popover>
	);
}
