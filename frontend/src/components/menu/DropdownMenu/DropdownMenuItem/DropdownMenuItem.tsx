import { useRef, useState } from "react";
import DropdownMenu, { DropdownMenuItemType } from "../DropdownMenu";

import { useDropdownMenu } from "@/hooks/menu/useDropdownMenu";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import styles from "./DropdownMenuItem.module.scss";

interface DropdownMenuItemProps extends DropdownMenuItemType {
  depth: number;

  onClose: () => void;
}

export default function DropdownMenuItem({ id, label, Icon, children, isDisabled, onClick, depth, onClose }: DropdownMenuItemProps) {
  const { menuRef } = useDropdownMenu({});
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const isOpen = isHovered || isClicked;
  const hasChildren = children?.length;

  const handleClick = () => {
    if (isDisabled) return;

    if (hasChildren) {
      setIsClicked(prev => !prev);
      setIsHovered(false);
    } else {
      onClick?.();
      onClose();
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    if (!isClicked) setIsHovered(false);
  }

  return (
    <button
      ref={buttonRef}
      disabled={isDisabled}
      className={clsx(styles.menuItem, isDisabled && styles.menuItemDisabled)}
      role="menuitem"
      aria-haspopup={hasChildren ? "menu" : undefined}
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-controls={hasChildren ? id : undefined}

      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header className={styles.head}>
        {Icon && <Icon className={styles.icon} aria-hidden="true" />}

        <span className={styles.label}>{label}</span>

        {hasChildren && (
          <ChevronDown className={clsx(styles.arrow, isOpen && styles.arrowOpen)} aria-hidden="true" />
        )}
      </header>
      
      {isOpen && hasChildren && (
        <div className={styles.dropdown}>
          <DropdownMenu
            id={id}
            items={children}
            depth={depth + 1}
            ref={menuRef}
            positionProps={{
              triggerRef: buttonRef,
              contentRef: menuRef,
              anchorOrigin: {
                horizontal: "right",
                vertical: "top",
              },
            }}

            onClose={onClose}
          />
        </div>
      )}
    </button>
  );
};