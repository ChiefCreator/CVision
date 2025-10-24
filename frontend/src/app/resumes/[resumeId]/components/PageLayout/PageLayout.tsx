"use client";

import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext";


import BurgerMenu from "@/components/button/BurgerMenu/BurgerMenu";
import Sidebar from "@/components/menu/Sidebar/Sidebar";
import Portal from "@/components/position/Portal/Portal";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
	resumeId: string;
}

export default function PageLayout({ resumeId }: PageLayoutProps) {
	const { isOpen, triggerRef, contentRef, toggle } = useAbsoluteSidebarContext();

	return (
		<>
			<div className={styles.layout}>
				<div className={styles.content}>
					{/* <ResumeEditor resumeId={resumeId} /> */}
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
