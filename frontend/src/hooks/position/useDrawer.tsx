import { useId, useState } from "react";
import { useLockBodyScroll } from "./useLockBodyScroll";

export const useDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const id = useId();

	const toggle = () => setIsOpen(o => !o);
	const close = () => setIsOpen(false);
	const open = () => setIsOpen(true);

	useLockBodyScroll(isOpen);

	return {
		id,
		isOpen,
		toggle,
		close,
		open,
	};
};
