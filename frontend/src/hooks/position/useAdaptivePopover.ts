import { breakpoints } from "@/constants/breakpoints/breakpoints";
import { maxWidth } from "@/utils/media/maxWidth";
import { useId, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useClickOutside } from "../root/useClickOutside";
import { useLockBodyScroll } from "./useLockBodyScroll";

export function useAdaptivePopover() {
	const isDrawer = useMediaQuery(maxWidth(breakpoints.tabletM));

	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const id = useId();

	const toggle = () => setIsOpen(o => !o);
	const close = () => setIsOpen(false);
	const open = () => setIsOpen(true);

	useLockBodyScroll(isDrawer && isOpen);
	useClickOutside({ mainComponentRef: contentRef, triggerRef, isEnabled: !isDrawer, onClickOutside: close });

	return {
		id,
		isOpen,
		triggerRef,
		contentRef,
		toggle,
		close,
		open,
		isDrawer,
	};
}
