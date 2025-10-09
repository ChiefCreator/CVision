import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import { ChevronDown } from "lucide-react";
import Dropdown from "./Dropdown/Dropdown";

import { isLinkMenuItem } from "@/utils/menu/isMenuItem";

import type { MenuItemData } from "@/types/menu/menu";
import type { ButtonMenuItemProps } from "../MenuItem";

import { useMenuContext } from "@/hooks/menu/useMenuContext";
import { DropdownTypeEnum } from "@/types/menu/dropdown";
import clsx from "clsx";
import baseStyles from "./../MenuItem.module.scss";
import styles from "./ButtonMenuItem.module.scss";

const isChildrenHaveActiveItem = (children: MenuItemData, activePathname: string) => {
  return !!children.find(item => {
    if (isLinkMenuItem(item)) {
      return item.pathname === activePathname;
    }

    return false;
  })
}

export default function ButtonMenuItem({
  id,
  title,
  Icon,
  children,
  isHideElements,
  level,
  isRepeatRegisterArrowNavigation,
  dropdownType,
  dropdownPositionerProps = {},
  onClick,
}: ButtonMenuItemProps) {
  const { register, focusNext, focusPrev, focusSubmenu, focusParent, setSubmenuTrigger } = useArrowNavigation();
  const { openMenuPath, toggleSubMenu, openSubMenu, closeSubMenu } = useMenuContext();
  const activePathname = usePathname();
 
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const isSubMenuOpen = openMenuPath?.includes(id);
  const isActive = isChildrenHaveActiveItem(children, activePathname) && !isSubMenuOpen;

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
          openSubMenu?.(level, id);
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

  const handleClick = () => {
    toggleSubMenu(level, id);

    onClick?.();
  }

  useEffect(() => {
    register(level, triggerRef);
  }, [isRepeatRegisterArrowNavigation]);
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
        aria-haspopup={dropdownType === DropdownTypeEnum.absolute}
        aria-expanded={isSubMenuOpen}
        aria-controls={id}

        onKeyDown={handleKeyDown}
        onClick={handleClick}
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
        {...(dropdownType === DropdownTypeEnum.absolute ? {
          closeSubMenu,
          positionerProps: {
            triggerRef,
            contentRef,
            ...dropdownPositionerProps,
          }
        } : {} as any)}
      />
    </>
  );
}
