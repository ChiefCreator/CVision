import Portal from '@/components/position/Portal/Portal';
import Positioner, { PositionerProps } from '@/components/position/Positioner/Positioner';
import React, { ComponentType } from 'react';
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem';

import clsx from "clsx";
import styles from "./DropdownMenu.module.scss";

interface DropdownMenuProps {
  id?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  items: DropdownMenuItemType[];
  depth?: number;

  positionProps: PositionerProps;

  onClose: () => void;
}

export interface DropdownMenuItemType {
  id: string;
  label: string;
  Icon?: ComponentType<{ className: string; }>;
  children?: DropdownMenuItemType[];
  isDisabled?: boolean;

  onClick?: () => void;
}

export default function DropdownMenu({ id, ref, items, depth = 0, positionProps, onClose }: DropdownMenuProps) {
  return (
    <Portal>
      <Positioner {...positionProps}>
        <div className={clsx(styles.menu, depth && styles.submenu)} id={id} ref={ref} role="menu">
          <ul className={styles.list}>
            {items.map(item => (
              <li key={item.id}>
                <DropdownMenuItem {...item} depth={depth + 1} onClose={onClose} />
              </li>
            ))}
          </ul>
        </div>
      </Positioner>
    </Portal>
  );
};
