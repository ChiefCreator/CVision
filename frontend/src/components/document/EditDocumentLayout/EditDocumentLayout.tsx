"use client"

import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext";

import BurgerMenu from "@/components/button/BurgerMenu/BurgerMenu";
import Sidebar from "@/components/menu/Sidebar/Sidebar";
import Portal from "@/components/position/Portal/Portal";
import styles from "./EditDocumentLayout.module.scss";


interface EditDocumentLayoutProps {
	id: string;
	children: React.ReactNode;
}

export default function EditDocumentLayout({ children }: EditDocumentLayoutProps) {
	const { isOpen, triggerRef, contentRef, toggle } = useAbsoluteSidebarContext();

	return (
		<>
			<div className={styles.layout}>
				<div className={styles.content}>
					{children}
				</div>
			</div>

			<Portal>
				<BurgerMenu
					className={styles.burgerMenu}
					isOpen={isOpen}
					ref={triggerRef}
					toggle={toggle}
				/>
			</Portal>

			<Sidebar
				type="absolute"
				popoverClassName={styles.sidebarPopover}
				positioner={{
					triggerRef,
					contentRef,
					offsetY: 3,
					anchorOrigin: { horizontal: "left", vertical: "bottom" },
					transformOrigin: { horizontal: "left", vertical: "top" },
					isFixed: true,
				}}
			/>
		</>
	);
}
