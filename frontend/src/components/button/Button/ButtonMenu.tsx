
import DropdownMenu from "@/components/menu/DropdownMenu/DropdownMenu";
import { ChevronDown } from "lucide-react";

import type { ButtonMenuProps } from "./Button";

import { useDropdownMenu } from "@/hooks/menu/useDropdownMenu";
import clsx from "clsx";
import styles from "./Button.module.scss";

export default function ButtonMenu({ className, children, Icon, iconClassName, menuData, menuPositionerProps, actionType }: ButtonMenuProps) {
  const { isOpen, triggerRef, menuRef, menuId, toggle, close } = useDropdownMenu({});

  return (
    <>
      <button
        className={clsx(styles.button, className)}
        type={actionType}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={toggle} ref={triggerRef}
      >
        {Icon && <Icon className={clsx(styles.icon, iconClassName)} aria-hidden="true" />}
  
        {children}

        <ChevronDown className={clsx(styles.arrow, isOpen && styles.arrowActive)} aria-hidden="true" />
      </button>

      {isOpen && (
        <DropdownMenu
          id={menuId}
          ref={menuRef}
          items={menuData}
          positionProps={menuPositionerProps ?? {
            matchTriggerWidth: true,
            offsetY: 3,
            triggerRef,
            contentRef: menuRef
          }}
          onClose={close}
        />
      )}
    </>
  );
}