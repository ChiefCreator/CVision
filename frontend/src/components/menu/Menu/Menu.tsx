import React from "react";

import { MenuItemData } from "@/types/menu/menu";

import { MenuProvider } from "@/hooks/menu/useMenuContext";
import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { BaseComponent } from "@/types/root";

import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { MenuList } from "./MenuList/MenuList";

export interface MenuProps extends BaseComponent {
  data: MenuItemData;
  openMenuPath: string[];
  level?: number;

  isHideElements?: boolean;
  isRepeatRegisterArrowNavigation?: boolean;
  subMenuDropdownType?: DropdownTypeEnum;
  isRecalcSubmenu?: boolean;

  setOpenMenuPath: (path: string[]) => void;
	openSubMenu: (level: number, id: string) => void;
	closeSubMenu: (id: string) => void;
	toggleSubMenu: (level: number, id: string) => void;

  onClickLink?: () => void;
  onClickControl?: () => void;
  onClickButton?: () => void;
  onClickLinkAndControl?: () => void;
}

export default React.memo(function Menu({
  className, isHideElements = false,
  subMenuDropdownType = DropdownTypeEnum.absolute, ...props
}: MenuProps) {
  const { data, level } = props;

  return (
    <MenuProvider {...props} isHideElements={isHideElements} subMenuDropdownType={subMenuDropdownType}>
      <ArrowNavigationProvider>
        <div className={clsx(styles.menu, className)} role="menu">
          <MenuList data={data} level={level} />
        </div>
      </ArrowNavigationProvider>
    </MenuProvider>
  );
})
