"use client"

import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import { useTabContent } from "../../hooks/useTabContent";
import { useTabsVariant } from "../../hooks/useTabsVariant";
import { TabsVariant } from "../../types/tabsVariant";
import styles from "./TabsContent.module.scss";

interface TabsContentProps extends BaseComponent {
	value: string;
	variant?: TabsVariant;
	children: React.ReactNode;
}

export default function TabsContent({ className, value, variant: variantProp, children }: TabsContentProps) {
	const { isActive } = useTabContent(value);
	const variant = useTabsVariant(variantProp);

	if (!isActive) return null;
	
	return (
		<div className={clsx(styles.content, className)} data-variant={variant}>{children}</div>
	)
}
