"use client";

import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext";

import BurgerMenu from "@/components/button/BurgerMenu/BurgerMenu";
import Logo from "@/components/Logo/Logo";

import type { BaseComponent } from "@/types/root";

import Container from "@/components/utils/Container/Container";
import clsx from "clsx";
import styles from "./Header.module.scss";

interface HeaderProps extends BaseComponent {}

export default function Header({ className }: HeaderProps) {
	const { isOpen, triggerRef, toggle } = useAbsoluteSidebarContext();

	return (
		<header className={clsx(styles.header, className)}>
			<Container className={styles.container}>
				<Logo className={styles.logo} href="/" />

				<div className={styles.controls}>
					<BurgerMenu
						className={styles.burgerMenu}
						isOpen={isOpen}
						toggle={toggle}
						ref={triggerRef}
					/>
				</div>
			</Container>
		</header>
	);
}
