import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import Link from "next/link";

import type { LinkMenuItemProps } from "../MenuItem";

import clsx from "clsx";
import baseStyles from "./../MenuItem.module.scss";
import styles from "./LinkMenuItem.module.scss";

const checkIsLinkActive = (activePathname: string, pathname: string, isIndexPathname?: boolean) => {
  if (isIndexPathname && activePathname === "/") return true;

  return activePathname === pathname;
}

export default function LinkMenuItem({ level, title, Icon, pathname, isIndexPathname = false, isHideElements = false, isRepeatRegisterArrowNavigation = false, onClick }: LinkMenuItemProps) {
  const { register, focusNext, focusPrev, focusParent } = useArrowNavigation();
  const activePathname = usePathname();
  
  const ref = useRef<HTMLAnchorElement>(null);

  const isLinkActive = checkIsLinkActive(activePathname, pathname, isIndexPathname);

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
      case "ArrowLeft":
      case "Escape":
        if (level > 0) {
          focusParent(level);
        }
        break;
    }
  };

  const handleClick = () => {
    onClick?.();
  }

  useEffect(() => {
    register(level, ref);
  }, [isRepeatRegisterArrowNavigation]);

  return (
    <Link
      className={clsx(baseStyles.menuItem, styles.link, isLinkActive && styles.linkActive)}
      href={pathname}
      ref={ref}
      role="menuitem"
      aria-current={isLinkActive ? "page" : undefined}
      aria-label={isHideElements ? title : undefined}

      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {Icon && <Icon className={baseStyles.menuItemIcon} aria-hidden="true" />}

      <AnimateHeightPresence isVisible={!isHideElements}>
        <span className={baseStyles.menuItemTitle}>{title}</span>
      </AnimateHeightPresence>
    </Link>
  );
}
