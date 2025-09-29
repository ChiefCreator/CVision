"use client"

import { useMenuState } from "@/hooks/menu/useMenuState";
import { useStaticSidebarContext } from "@/hooks/menu/useStaticSidebarContext";
import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";
import { useRef } from "react";

import { AccountBlock } from "@/components/account/AccountBlock/AccountBlock";
import Logo from "@/components/Logo/Logo";
import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import Menu from "../Menu/Menu";
import ButtonToggle from "./ButtonToggle/ButtonToggle";

import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { StaticSidebarProps } from "./Sidebar";

import { sidebarMenuData } from "@/constants/menu/sidebarMenuData";

import clsx from "clsx";
import styles from "./Sidebar.module.scss";

export default function StaticSidebar({ className }: StaticSidebarProps) {
	const { isOpen, isAnimating, toggle, stopAnimating } = useStaticSidebarContext();
	const menuState = useMenuState();

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	
	const handleTransitionEnd = () => {
		clearTimeout(timeoutRef.current ?? undefined);
		timeoutRef.current = setTimeout(() => stopAnimating(), 1000);
	}

	return (
		<aside
			className={clsx(styles.sidebar, isOpen && styles.sidebarOpen, className)}
			onTransitionEnd={handleTransitionEnd}
			data-performance="static"
		>
			<div className={styles.sidebarContainer}>
				<div className={styles.sidebarContent}>
					<header className={styles.head}>
						<AnimateHeightPresence
							isVisible={isOpen}
							className={styles.logoWrapper}
						>
							<Logo className={styles.logo} href="/" />
						</AnimateHeightPresence>

						<ButtonToggle
							className={styles.toggle}
							isOpen={isOpen}
							onToggle={toggle}
						/>
					</header>

					<nav className={styles.nav}>
						<div className={styles.navBlock}>
							<AnimateHeightPresence isVisible={isOpen}>
								<label className={styles.navBlockLabel}>Аккаунт</label>
							</AnimateHeightPresence>

							<AccountBlock
								className={styles.accountBlock}
								hideInfo={!isOpen}
							/>

							<AnimateHeightPresence isVisible={isOpen}>
								<label className={styles.navBlockLabel}>Основное</label>
							</AnimateHeightPresence>

							<ArrowNavigationProvider>
								<Menu
									className={className}
									data={sidebarMenuData}
						
									isHideElements={!isOpen} 
									isRepeatRegisterArrowNavigation={isOpen}
									subMenuDropdownType={isOpen ? DropdownTypeEnum.static : DropdownTypeEnum.absolute}
									isRecalcSubmenu={isAnimating}
									{...menuState}
								/>
							</ArrowNavigationProvider>
						</div>
					</nav>
				</div>
			</div>
		</aside>
	);
}
