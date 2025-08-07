"use client"

import { useDropdownMenu } from "@/hooks/menu/useDropdownMenu";

import IconButton from "@/components/button/IconButton/IconButton";
import UserMenu from "@/components/menu/UserMenu/UserMenu";
import { Settings2 } from "lucide-react";

import type { BaseComponent } from "@/types/root";

import styles from "./Header.module.scss";
import clsx from "clsx";

interface HeaderProps extends BaseComponent {};

export default function Header({ className }: HeaderProps) {
  const { isOpen, triggerRef, menuRef, menuId, toggle, close } = useDropdownMenu();

  return (
    <header className={clsx(styles.header, className)}>
      <IconButton
        className={styles.buttonMenu}
        Icon={Settings2}
        ref={triggerRef}
        onClick={toggle}
      />

      {isOpen && (
        <UserMenu
          id={menuId}
          ref={menuRef}
          positionProps={{
            contentRef: menuRef,
            anchorOrigin: { horizontal: "right", vertical: "bottom" },
            transformOrigin: { horizontal: "right", vertical: "top" },
            triggerRef,
          }}
          onClose={close}
        />
      )}
    </header>
  );
}