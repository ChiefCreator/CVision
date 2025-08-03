import type { IconComponent } from "@/types/root";

export interface BaseMenuItemData {
  id: string;
  title: string;
  Icon?: IconComponent
}

export interface LinkMenuItemData extends BaseMenuItemData {
  type: "link";
  pathname: string;
  isIndexPathname?: boolean;
}

export interface ButtonMenuItemData extends BaseMenuItemData {
  type: "button";
  children: MenuItemData[];
}

export interface ControlMenuItemData extends BaseMenuItemData {
  type: "control";
  onClick: () => void;
}

export type MenuItemData = LinkMenuItemData | ButtonMenuItemData | ControlMenuItemData;