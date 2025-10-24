"use client"

import { BaseComponent } from "@/types/root";
import { TabsProvider } from "./hooks/useTabsContext";

import clsx from "clsx";
import { useImperativeHandle } from "react";
import styles from "./Tabs.module.scss";
import TabsContent from "./components/TabsContent/TabsContent";
import TabsList from "./components/TabsList/TabsList";
import TabsTrigger from "./components/TabsTrigger/TabsTrigger";
import { useTabs } from "./hooks/useTabs";
import { TabsVariant } from "./types/tabsVariant";

export interface TabsApi {
  getTriggers: () => HTMLButtonElement[];
	getCurrentValue: () => string;
};

export interface TabsProps extends BaseComponent {
  value?: string;
	defaultValue?: string;
	variant?: TabsVariant;
	children: React.ReactNode;
	apiRef?: React.RefObject<TabsApi | null>;
	
	onChangeValue?: (v: string) => void;
}

export default function Tabs({ className, value, defaultValue, variant, children, apiRef, onChangeValue }: TabsProps) {
	const data = useTabs({ value, defaultValue, onChangeValue });

	useImperativeHandle(apiRef, () => ({
    getTriggers: data.getTriggers,
		getCurrentValue: data.getCurrentValue,
  }));

	return (
		<TabsProvider value={{ ...data, variant }}>
			<div className={clsx(styles.tabs, className)}>
				{children}
			</div>
		</TabsProvider>
	)
}

Tabs.List = TabsList;

Tabs.Trigger = TabsTrigger;

Tabs.Content = TabsContent;
