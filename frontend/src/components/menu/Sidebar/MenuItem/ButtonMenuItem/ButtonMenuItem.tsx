import React, { useEffect, useRef } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import { usePathname } from "next/navigation";
import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";

import Dropdown from "./Dropdown/Dropdown";
import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import { ChevronDown } from "lucide-react";

import { isLinkMenuItemData } from "../../utils/isMenuItemData";

import type { ButtonMenuItemProps } from "../MenuItem";
import type { MenuItemData } from "../../types/menuItemData";

import baseStyles from "./../MenuItem.module.scss";
import styles from "./ButtonMenuItem.module.scss";
import clsx from "clsx";

const isChildrenHaveActiveItem = (children: MenuItemData[], activePathname: string) => {
  return !!children.find(item => {
    if (isLinkMenuItemData(item)) {
      return item.pathname === activePathname;
    }

    return false;
  })
}
const getDropdownType = (isAbsolute: boolean, isOpen: boolean) => {
  if (isAbsolute && !isOpen) return "none";

  return isOpen ? "static" : "absolute";
}

export default function ButtonMenuItem({ id, title, Icon, children, isHideElements, level }: ButtonMenuItemProps) {
  const { register, focusNext, focusPrev, focusSubmenu, focusParent, setSubmenuTrigger } = useArrowNavigation();
  const { isAbsolute, isOpen, openMenuPath, setOpenMenuPath } = useSidebar();
  const activePathname = usePathname();
 
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const isSubMenuOpen = openMenuPath.includes(id);
  const isActive = isChildrenHaveActiveItem(children, activePathname) && !isSubMenuOpen;
  const dropdownType = getDropdownType(isAbsolute, isOpen);

  const openSubMenu = () => {
    setOpenMenuPath([...openMenuPath.slice(0, level), id]);
  }
  const closeSubMenu = () => {
    setOpenMenuPath(openMenuPath.slice(0, openMenuPath.indexOf(id)));
  }
  const toggleSubMenu = () => {
    isSubMenuOpen ? closeSubMenu() : openSubMenu();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Escape"].includes(e.key)) e.preventDefault();

    switch (e.key) {
      case "ArrowDown":
        focusNext(level);
        break;
      case "ArrowUp":
        focusPrev(level);
        break;
      case "ArrowRight":
          openSubMenu?.();
          focusSubmenu(level);
        break;
      case "ArrowLeft":
      case "Escape":
        if (level > 0) {
          focusParent(level);
        }
        break;
    }
  };

  useEffect(() => {
    register(level, triggerRef);
  }, [isOpen]);
  useEffect(() => {
    setSubmenuTrigger(level + 1, triggerRef, level);
  }, []);

  return (
    <>
      <button
        className={clsx(baseStyles.menuItem, styles.button, isActive && styles.buttonActive)}
        type="button"
        ref={triggerRef}
        role="menuitem"
        aria-haspopup={dropdownType === "absolute"}
        aria-expanded={isSubMenuOpen}
        aria-controls={id}

        onClick={toggleSubMenu}
        onKeyDown={handleKeyDown}
      >
        {Icon && <Icon className={baseStyles.menuItemIcon} />}
    
        <AnimateHeightPresence isVisible={!isHideElements} styles={{ width: "100%" }}>
          <div className={styles.buttonContent}>
            <span className={baseStyles.menuItemTitle}>{title}</span>
    
            <ChevronDown className={clsx(styles.arrow, isSubMenuOpen && styles.arrowActive)} />
          </div>
        </AnimateHeightPresence>
      </button>

      <Dropdown
        type={dropdownType}
        id={id}
        data={children}
        level={level + 1}
        isOpen={isSubMenuOpen}
        {...(dropdownType === "absolute" ? { triggerRef, closeSubMenu } : {} as any)}
      />
    </>
  );
}
