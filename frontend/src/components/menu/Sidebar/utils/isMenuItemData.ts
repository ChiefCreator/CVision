import type { MenuItemData, LinkMenuItemData } from "../types/menuItemData";

export function isLinkMenuItemData(data: MenuItemData): data is LinkMenuItemData {
  return data.type === "link";
}