"use client"

import Link from 'next/link'
import Portal from "@/components/position/Portal/Portal";
import styles from "./UserMenu.module.scss";
import Positioner, { PositionerProps } from "@/components/position/Positioner/Positioner";
import { LogOut, Settings } from "lucide-react";

interface UserMenuProps {
  id?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  positionProps: PositionerProps;

  onClose: () => void;
}

export default function UserMenu({ id, ref, positionProps, onClose }: UserMenuProps) {
  return (
    <Portal>
      <Positioner {...positionProps}>
        <div className={styles.menu} id={id} ref={ref}>
          <header className={styles.header}>
            <span className={styles.userName}>userName</span>
            <span className={styles.email}>email</span>
          </header>

          <ul className={styles.list}>
            <li>
              <Link className={styles.menuItem} href="/settings/account">
                <Settings size={18} className={styles.menuItemIcon} />

                Настройки аккаунта
              </Link>
            </li>
            <li>
              <button className={styles.menuItem} type="button" onClick={() => console.log("log out")}>
                <LogOut size={18} className={styles.menuItemIcon} />

                Выйти
              </button>
            </li>
          </ul>
        </div>
      </Positioner>
    </Portal>
  );
}