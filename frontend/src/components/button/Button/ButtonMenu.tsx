
import { ChevronDown } from "lucide-react";

import type { ButtonMenuProps } from "./Button";

import ResponsiveDropdownMenu from "@/components/menu/ResponsiveDropdownMenu/ResponsiveDropdownMenu";
import { useMenuState } from "@/hooks/menu/useMenuState";
import { useAdaptivePopover } from "@/hooks/position/useAdaptivePopover";
import clsx from "clsx";
import styles from "./Button.module.scss";

export default function ButtonMenu({
  variant,
  className,
  children,
  Icon,
  iconClassName,
  menuData,
  menuPositionerProps = {},
  menuPortalProps = {},
  menuTitle,
  actionType
}: ButtonMenuProps) {
  const { isOpen, triggerRef, contentRef, id, toggle, close } = useAdaptivePopover();
  const menuState = useMenuState();

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

      <ResponsiveDropdownMenu
        data={menuData}
        {...menuState}
        onClickLinkAndControl={close}

        isOpen={isOpen}
        id={id}

        positioner={{
          matchTriggerWidth: true,
          offsetY: 3,
          triggerRef,
          contentRef,
          ...menuPositionerProps,
        }}
        portal={menuPortalProps}

        title={menuTitle}
        onClose={close}
      />
    </>
  );
}