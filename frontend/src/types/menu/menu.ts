import type { IconComponent } from "@/types/root";

export interface BaseMenuItem {
	id: string;
	title: string;
	Icon?: IconComponent
}

export interface LinkMenuItem extends BaseMenuItem {
	type: "link";
	pathname: string;
	isIndexPathname?: boolean;
}

export interface ButtonMenuItem extends BaseMenuItem {
	type: "button";
	children: MenuItem[];
}

export interface ControlMenuItem extends BaseMenuItem {
	type: "control";
	onClick: () => void;
}

export type MenuItem = LinkMenuItem | ButtonMenuItem | ControlMenuItem;

export type MenuItemData = MenuItem[];

export type MenuItemType = MenuItem["type"];