"use client"

import { useMediaQuery } from "react-responsive";
import DrawerMenu, { DrawerMenuProps } from "../DrawerMenu/DrawerMenu";
import PopoverMenu, { PopoverMenuProps } from "../PopoverMenu/PopoverMenu";

type ResponsiveMenuProps = DrawerMenuProps & PopoverMenuProps;

export default function ResponsiveDropdownMenu(props: ResponsiveMenuProps) {
	const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return <DrawerMenu {...props} />;
  }

  return <PopoverMenu {...props} />;
}
