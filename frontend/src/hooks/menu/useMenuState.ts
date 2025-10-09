// useMenuState.ts
import { useState } from "react";

export function useMenuState() {
  const [openMenuPath, setOpenMenuPathState] = useState<string[]>([]);

  const lastOpenPath = openMenuPath[openMenuPath.length - 1];

  const setOpenMenuPath = (path: string[]) => setOpenMenuPathState(path);

  const openSubMenu = (level: number, id: string) => {
    setOpenMenuPath([...openMenuPath.slice(0, level), id]);
  };

  const closeSubMenu = (id: string) => {
    setOpenMenuPath(openMenuPath.slice(0, openMenuPath.indexOf(id)));
  };

  const toggleSubMenu = (level: number, id: string) => {
    openMenuPath.includes(id) ? closeSubMenu(id) : openSubMenu(level, id);
  };

  return { openMenuPath, lastOpenPath, setOpenMenuPath, openSubMenu, closeSubMenu, toggleSubMenu };
}
