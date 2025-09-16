
import DropdownMenu from "@/components/menu/DropdownMenu/DropdownMenu";
import { ChevronDown } from "lucide-react";

import type { ButtonMenuProps } from "./Button";

import { usePopover } from "@/hooks/position/usePopover";
import clsx from "clsx";
import styles from "./Button.module.scss";

export default function ButtonMenu({ variant, className, children, Icon, iconClassName, menuData, menuPositionerProps, actionType }: ButtonMenuProps) {
  const { isOpen, triggerRef, contentRef, id, toggle } = usePopover();

  return (
    <>
      <button
        className={clsx(styles.button, className)}
        type={actionType}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={toggle}
        ref={triggerRef}
        data-variant={variant}
      >
        {Icon && <Icon className={clsx(styles.icon, iconClassName)} aria-hidden="true" />}
  
        {children}

        <ChevronDown className={clsx(styles.arrow, isOpen && styles.arrowActive)} aria-hidden="true" />
      </button>

      {isOpen && (
        <DropdownMenu
          id={id}
          data={menuData}
          positioner={menuPositionerProps ?? {
            matchTriggerWidth: true,
            offsetY: 3,
            triggerRef,
            contentRef
          }}
        />
      )}
    </>
  );
}