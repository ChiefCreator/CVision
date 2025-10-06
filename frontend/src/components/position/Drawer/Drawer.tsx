"use client"

import { BaseComponent } from "@/types/root";

import IconButton from "@/components/button/IconButton/IconButton";
import { useDragDrawer } from "@/hooks/position/useDragDrawer";
import clsx from "clsx";
import { ChevronLeft, X } from "lucide-react";
import Overlay from "../Overlay/Overlay";
import Portal from "../Portal/Portal";
import styles from "./Drawer.module.scss";

export interface DrawerProps extends BaseComponent {
	isOpen: boolean;
	id?: string;
	title?: string;
	children: React.ReactNode;
	hasBackButton?: boolean;
	hasCloseButton?: boolean;

	onBack?: () => void;
	onClose: () => void;
}

export default function Drawer({ isOpen, className, id, title, children, hasBackButton = false, hasCloseButton = true, onBack, onClose }: DrawerProps) {
	const { contentRef, handlePointerDown, handlePointerMove, handlePointerUp } = useDragDrawer({ onClose });

	if (!isOpen) return null;

	return (
		<Portal>
			<Overlay className={styles.overlay} isActive={isOpen} onClick={onClose} />

			<div className={clsx(styles.drawer, isOpen && styles.drawerActive, className)} id={id} ref={contentRef}>
				<div
					className={styles.trigger}

					onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
				>
					<div className={styles.uiTrigger}>
						<button className={styles.uiTriggerButton}></button>
					</div>
		
					<header className={styles.header}>
						{hasBackButton && <IconButton Icon={ChevronLeft} onClick={onBack} />}
		
						{title && <span className={styles.title}>{title}</span>}
		
						{hasCloseButton && <IconButton className={styles.closeButton} Icon={X} onClick={onClose} />}
					</header>
				</div>
		
				<div className={styles.content}>{children}</div>
			</div>
		</Portal>
	)
}
