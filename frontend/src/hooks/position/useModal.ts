import { useId, useRef, useState } from "react";
import { useLockBodyScroll } from "./useLockBodyScroll";

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const id = useId();

	const toggle = () => setIsOpen(o => !o);
	const close = () => setIsOpen(false);
	const open = () => setIsOpen(true);

	useLockBodyScroll(isOpen);

	return {
		id,
		isOpen,
		triggerRef,
		modalRef,
		toggle,
		close,
		open,
	};
};
