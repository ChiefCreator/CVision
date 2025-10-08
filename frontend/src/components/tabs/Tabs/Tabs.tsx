"use client"

import { BaseComponent } from "@/types/root";
import { TabsProvider } from "./hooks/useTabsContext";

import clsx from "clsx";
import styles from "./Tabs.module.scss";
import TabsContent from "./components/TabsContent/TabsContent";
import TabsList from "./components/TabsList/TabsList";
import TabsTrigger from "./components/TabsTrigger/TabsTrigger";

type TabsProps = React.ComponentProps<typeof TabsProvider> & BaseComponent;

export default function Tabs({ children, className, ...props }: TabsProps) {
	return (
		<TabsProvider {...props}>
			<div className={clsx(styles.tabs, className)}>
				{children}
			</div>
		</TabsProvider>
	)
}

Tabs.List = TabsList;

Tabs.Trigger = TabsTrigger;

Tabs.Content = TabsContent;
