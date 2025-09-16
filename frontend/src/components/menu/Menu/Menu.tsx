import React from "react";

import { MenuItemData } from "@/types/menu/menu";

import { MenuProvider } from "@/hooks/menu/useMenu";
import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { BaseComponent } from "@/types/root";

import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { MenuList } from "./MenuList/MenuList";

export interface MenuProps extends BaseComponent {
  data: MenuItemData;
  level?: number;
  isHideElements?: boolean;
  isRepeatRegisterArrowNavigation?: boolean;
  subMenuDropdownType?: DropdownTypeEnum;
}

export default React.memo(function Menu({
  className, data, level = 0,
  isHideElements = false,
  isRepeatRegisterArrowNavigation,
  subMenuDropdownType = DropdownTypeEnum.absolute
}: MenuProps) {
  return (
    <MenuProvider
      isHideElements={isHideElements}
      isRepeatRegisterArrowNavigation={isRepeatRegisterArrowNavigation}
      subMenuDropdownType={subMenuDropdownType}
    >
      <ArrowNavigationProvider>
        <div className={clsx(styles.menu, className)} role="menu">
          <MenuList data={data} level={level} />
        </div>
      </ArrowNavigationProvider>
    </MenuProvider>
  );
})
