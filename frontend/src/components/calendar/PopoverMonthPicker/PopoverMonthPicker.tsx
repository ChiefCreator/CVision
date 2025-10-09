"use client"

import Popover, { PopoverProps } from "@/components/position/Popover/Popover";
import MonthPicker, { MonthPickerProps } from "../MonthPicker/MonthPicker";

export type PopoverMonthPickerProps = Omit<PopoverProps, "children"> & MonthPickerProps;

export default function PopoverMonthPicker({ className, id, isOpen, positioner, portal, ...monthPickerProps }: PopoverMonthPickerProps) {
	return (
		<Popover className={className} id={id} isOpen={isOpen} positioner={positioner} portal={portal}>
			<MonthPicker {...monthPickerProps} />
		</Popover>
	)
}
