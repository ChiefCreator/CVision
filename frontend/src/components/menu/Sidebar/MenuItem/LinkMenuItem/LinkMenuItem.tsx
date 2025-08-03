import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";
import { useSidebar } from "../../hooks/useSidebar";

import Link from "next/link";
import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";

import type { LinkMenuItemProps } from "../MenuItem";

import styles from "./LinkMenuItem.module.scss";
import baseStyles from "./../MenuItem.module.scss";
import clsx from "clsx";

const checkIsLinkActive = (activePathname: string, pathname: string, isIndexPathname?: boolean) => {
  if (isIndexPathname && activePathname === "/") return true;

  return activePathname === pathname;
}

export default function LinkMenuItem({ level, title, Icon, pathname, isIndexPathname = false, isHideElements }: LinkMenuItemProps) {
  const { register, focusNext, focusPrev, focusParent } = useArrowNavigation();
  const activePathname = usePathname();
  const { isOpen } = useSidebar();

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

  useEffect(() => {
    register(level, ref);
  }, [isOpen]);

  return (
    <Link
      className={clsx(baseStyles.menuItem, styles.link, isLinkActive && styles.linkActive)}
      href={pathname}
      ref={ref}
      role="menuitem"
      aria-current={isLinkActive ? "page" : undefined}
      aria-label={isHideElements ? title : undefined}

      onKeyDown={handleKeyDown}
    >
      {Icon && <Icon className={baseStyles.menuItemIcon} aria-hidden="true" />}

      <AnimateHeightPresence isVisible={!isHideElements}>
        <span className={baseStyles.menuItemTitle}>{title}</span>
      </AnimateHeightPresence>
    </Link>
  );
}
