import { ButtonMenuItem, MenuItemData } from "@/types/menu/menu";

export function findMenuItemById(items: MenuItemData, id: string): ButtonMenuItem | undefined {
  for (const item of items) {
    if (item.id === id) {
      return item as ButtonMenuItem;
    }

    if (item.type === "button" && item.children.length > 0) {
      const found = findMenuItemById(item.children, id);
      if (found) return found;
    }
  }

  return undefined;
}