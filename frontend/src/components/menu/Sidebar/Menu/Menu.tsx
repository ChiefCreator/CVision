import React from "react";
import MenuItem from "../MenuItem/MenuItem";

import { MenuItemData } from "../types/menuItemData";

import styles from "./Menu.module.scss";
import { useSidebar } from "../hooks/useSidebar";

interface MenuProps {
  data: MenuItemData[];
  level?: number;
}

export default React.memo(function Menu({ data, level = 0 }: MenuProps) {
  const { isOpen } = useSidebar();
  const isHideElements = !!(level === 0 && !isOpen);

  return (
    <div className={styles.menu} role="menu">
      <ul className={styles.menuList}>
        {data.map((data, index) => (
          <li key={data.id}>
            <MenuItem {...{ ...data, level, index, isHideElements }} />
          </li>
        ))}
      </ul>
    </div>
  );
})
