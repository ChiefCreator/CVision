import { useId, useRef, useState } from "react";
import { useClickOutside } from "../root/useClickOutside";

export const usePopover = () => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const id = useId();

	const toggle = () => setIsOpen(o => !o);
	const close = () => setIsOpen(false);
	const open = () => setIsOpen(true);

	useClickOutside({ mainComponentRef: contentRef, triggerRef, onClickOutside: close });

	return {
		id,
		isOpen,
		triggerRef,
		contentRef,
		toggle,
		close,
		open,
	};
};
