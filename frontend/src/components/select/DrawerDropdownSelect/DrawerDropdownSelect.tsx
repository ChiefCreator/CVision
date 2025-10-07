"use client";

import Drawer, { DrawerProps } from "@/components/position/Drawer/Drawer";
import DropdownSelect, {
	DropdownSelectProps,
} from "../DropdownSelect/DropdownSelect";

export type DrawerDropdownSelectProps = DropdownSelectProps & Omit<DrawerProps, "children">;

export default function DrawerDropdownSelect({
	isOpen,
	className,
	title = "Выберите...",
	id,
	hasCloseButton = true,
	hasBackButton,
	onClose,
	onBack,
	...dropdownSelectProps
}: DrawerDropdownSelectProps) {
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
			<DropdownSelect {...dropdownSelectProps} variant="primary" />
		</Drawer>
	);
}
