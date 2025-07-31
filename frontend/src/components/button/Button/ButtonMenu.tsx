import { useId, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/root/useClickOutside";

import DropdownMenu from "@/components/menu/DropdownMenu/DropdownMenu";
import { ChevronDown } from "lucide-react";

import type { ButtonMenuProps } from "./Button";

import styles from "./Button.module.scss";
import clsx from "clsx";

export default function ButtonMenu({ className, children, Icon, iconClassName, menuData, menuPositionerProps, actionType }: ButtonMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const butonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuId = useId();

  const toggle = () => setIsMenuOpen(prev => !prev);
  const close = () => setIsMenuOpen(false);

  useClickOutside({ mainComponentRef: menuRef, triggerRef: butonRef, onClickOutside: close });

  return (
    <>
      <button
        className={clsx(styles.button, className)}
        type={actionType}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        onClick={toggle} ref={butonRef}
      >
        {Icon && <Icon className={clsx(styles.icon, iconClassName)} aria-hidden="true" />}
  
        {children}

        <ChevronDown className={clsx(styles.arrow, isMenuOpen && styles.arrowActive)} aria-hidden="true" />
      </button>

      {isMenuOpen && (
        <DropdownMenu
          id={menuId}
          ref={menuRef}
          items={menuData}
          positionProps={menuPositionerProps ?? {
            matchTriggerWidth: true,
            offsetY: 3,
            triggerRef: butonRef
          }}
          onClose={close}
        />
      )}
    </>
  );
}