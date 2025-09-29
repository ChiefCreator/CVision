"use client"

import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext";
import { useMenuState } from "@/hooks/menu/useMenuState";
import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";

import { AccountBlock } from "@/components/account/AccountBlock/AccountBlock";
import Popover from "@/components/position/Popover/Popover";
import Menu from "../Menu/Menu";

import { sidebarMenuData } from "@/constants/menu/sidebarMenuData";

import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { AbsoluteSidebarProps } from "./Sidebar";

import clsx from "clsx";
import styles from "./Sidebar.module.scss";

export default function AbsoluteSidebar({ className, popoverClassName, positioner }: AbsoluteSidebarProps) {
	const { isOpen, contentRef, triggerRef } = useAbsoluteSidebarContext();
	const menuState = useMenuState();
	
	return (
		<Popover
			className={clsx(popoverClassName, styles.sidebarPopover)}
			isOpen={isOpen}
			positioner={positioner ?? {
				contentRef,
				triggerRef,
				offsetY: 3,
				anchorOrigin: { horizontal: "right", vertical: "bottom" },
				transformOrigin: { horizontal: "right", vertical: "top" },
			}}
		>
			<aside
				className={clsx(styles.sidebar, isOpen && styles.sidebarOpen, className)}
				data-performance="absolute"
			>
				<div className={styles.sidebarContainer}>
					<div className={styles.sidebarContent}>
						<nav className={styles.nav}>
							<div className={styles.navBlock}>
								<label className={styles.navBlockLabel}>Аккаунт</label>

								<AccountBlock
									className={styles.accountBlock}
									hideInfo={!isOpen}
								/>

								<label className={styles.navBlockLabel}>Основное</label>

								<ArrowNavigationProvider>
									<Menu
										className={className}
										data={sidebarMenuData}
							
										isHideElements={false} 
										isRepeatRegisterArrowNavigation={isOpen}
										subMenuDropdownType={DropdownTypeEnum.static}
										{...menuState}
									/>
								</ArrowNavigationProvider>
							</div>
						</nav>
					</div>
				</div>
			</aside>
		</Popover>
	)
}
