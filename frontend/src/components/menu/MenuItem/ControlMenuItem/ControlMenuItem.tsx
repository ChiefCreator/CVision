import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";
import React, { useEffect, useRef } from "react";

import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";


import clsx from "clsx";
import { ControlMenuItemProps } from "../MenuItem";
import baseStyles from "./../MenuItem.module.scss";
import styles from "./ControlMenuItem.module.scss";

export default function ControlMenuItem({ level, title, Icon, isHideElements = false, isRepeatRegisterArrowNavigation= false, onClick }: ControlMenuItemProps) {
  const { register, focusNext, focusPrev, focusParent } = useArrowNavigation();

  const ref = useRef<HTMLButtonElement>(null);

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
  }, [isRepeatRegisterArrowNavigation]);

  return (
    <button
      className={clsx(baseStyles.menuItem, styles.link)}

      ref={ref}
      role="menuitem"
      aria-label={isHideElements ? title : undefined}

      onKeyDown={handleKeyDown}
      onClick={onClick}
    >
      {Icon && <Icon className={baseStyles.menuItemIcon} aria-hidden="true" />}

      <AnimateHeightPresence isVisible={!isHideElements}>
        <span className={baseStyles.menuItemTitle}>{title}</span>
      </AnimateHeightPresence>
    </button>
  );
}
