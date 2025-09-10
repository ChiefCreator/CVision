import type { StaticDropdownProps } from "./Dropdown";

import { MenuList } from "@/components/menu/Menu/MenuList/MenuList";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";

export default function StaticDropdown({ id, data, level, isOpen }: StaticDropdownProps) {
  return (
    <div className={clsx(styles.dropdown, isOpen && styles.dropdownOpen)} id={id}>
      <div className={styles.dropdownContainer}>
        <MenuList data={data} level={level} />
      </div>
    </div>
  );
}