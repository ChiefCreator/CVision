"use client";

import { useMediaQuery } from "react-responsive";

import { BaseComponent } from "@/types/root";
import { PositionerProps } from "../Positioner/Positioner";
import { DesktopPopover } from "./DesktopPopover/DesktopPopover";
import { MobilePopover } from "./MobilePopover/MobilePopover";

export interface PopoverProps extends BaseComponent {
	id?: string;
	children: React.ReactNode;
	positioner?: PositionerProps;
}

export default function Popover({ className, id, children, positioner }: PopoverProps) {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	if (isMobile) return <MobilePopover id={id} className={className}>{children}</MobilePopover>

	return <DesktopPopover id={id} className={className} positioner={positioner as any}>{children}</DesktopPopover>
}
