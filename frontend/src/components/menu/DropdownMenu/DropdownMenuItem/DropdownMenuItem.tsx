import { useRef, useState } from "react";
import DropdownMenu, { DropdownMenuItemType } from "../DropdownMenu";

import styles from "./DropdownMenuItem.module.scss";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface DropdownMenuItemProps extends DropdownMenuItemType {
  depth: number;

  onClose: () => void;
}


export default function DropdownMenuItem({ id, label, Icon, children, isDisabled, onClick, depth, onClose }: DropdownMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isOpen = isHovered || isClicked;
  const buttonRef = useRef<HTMLButtonElement>(null);
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

      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header className={styles.head}>
        {Icon && <Icon className={styles.icon} />}

        <span className={styles.label}>{label}</span>

        {hasChildren && (
          <ChevronDown className={clsx(styles.arrow, isOpen && styles.arrowOpen)} />
        )}
      </header>
      
      {isOpen && hasChildren && (
        <div className={styles.dropdown}>
          <DropdownMenu
            items={children}
            depth={depth + 1}
            positionProps={{
              triggerRef: buttonRef,
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