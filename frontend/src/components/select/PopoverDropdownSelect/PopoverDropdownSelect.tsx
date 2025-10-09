"use client"

import Popover, { PopoverProps } from "@/components/position/Popover/Popover";
import DropdownSelect, { DropdownSelectProps } from "../DropdownSelect/DropdownSelect";

export type PopoverDropdownSelectProps = DropdownSelectProps & Omit<PopoverProps, "children">;

export default function PopoverDropdownSelect({ className, id, isOpen, positioner, portal, variant, ...dropdownSelectProps }: PopoverDropdownSelectProps) {
	return (
		<Popover className={className} id={id} isOpen={isOpen} positioner={positioner} portal={portal} variant={variant}>
			<DropdownSelect {...dropdownSelectProps} variant={variant} />
		</Popover>    
	)
}
