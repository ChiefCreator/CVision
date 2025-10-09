"use client"

import { useTabList } from "../../hooks/useTabList";
import { useTabsVariant } from "../../hooks/useTabsVariant";

import { BaseComponent } from "@/types/root";
import { TabsVariant } from "../../types/tabsVariant";

import clsx from "clsx";
import styles from "./TabsList.module.scss";

interface TabsListProps extends BaseComponent {
	variant?: TabsVariant;
	children: React.ReactNode;
}

export default function TabsList({ className, variant: variantProp, children }: TabsListProps) {
	const { ref } = useTabList();
	const variant = useTabsVariant(variantProp);

	return (
		<div className={clsx(styles.list, className)} data-variant={variant} ref={ref}>
			{children}
		</div>
	)
}
