"use client";

import Drawer, { DrawerProps } from "@/components/position/Drawer/Drawer";
import MonthPicker, { MonthPickerProps } from "../MonthPicker/MonthPicker";

export type DrawerMonthPickerProps = Omit<DrawerProps, "children"> & MonthPickerProps;

export default function DrawerMonthPicker({
	className,
	id,
	isOpen,
	title,
	hasBackButton,
	hasCloseButton,
	onClose,
	onBack,
	...monthPickerProps
}: DrawerMonthPickerProps) {
	return (
		<Drawer
			isOpen={isOpen}
			className={className}
			id={id}
			title={title}
			hasBackButton={hasBackButton}
			hasCloseButton={hasCloseButton}
			onClose={onClose}
			onBack={onBack}
		>
			<MonthPicker {...monthPickerProps} />
		</Drawer>
	);
}
