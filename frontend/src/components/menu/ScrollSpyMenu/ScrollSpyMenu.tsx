"use client"

import { Section } from "@/types/menu/scrollSpyMenu";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./ScrollSpyMenu.module.scss";

interface ScrollSpyMenuProps extends BaseComponent {
	sections: Section[];
	activeId: string | null;
	onItemClick: (id: string) => void;
}

export default function ScrollSpyMenu({ className, sections, activeId, onItemClick }: ScrollSpyMenuProps) {
	return (
		<nav className={clsx(styles.menu, className)}>
			<ul className={styles.list}>
				{sections.map(({ id, label }) => (
					<li className={styles.item} key={id}>
					  <button
              onClick={() => onItemClick(id)}
              className={clsx(styles.menuItem, activeId === id && styles.menuItemActive)}
            >
              {label}
            </button>
					</li>
				))}
			</ul>
		</nav>
	)
}
