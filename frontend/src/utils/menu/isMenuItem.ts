import type { LinkMenuItem, MenuItem } from "@/types/menu/menu";

export function isLinkMenuItem(data: MenuItem): data is LinkMenuItem {
  return data.type === "link";
}