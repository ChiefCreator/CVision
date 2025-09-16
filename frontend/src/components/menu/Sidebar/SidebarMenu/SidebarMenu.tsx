import React from "react";

import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { useSidebar } from "../../../../hooks/menu/useSidebar";
import Menu, { MenuProps } from "../../Menu/Menu";

interface SidebarMenuProps extends MenuProps {};

export default React.memo(function SidebarMenu({ className, data, level = 0 }: SidebarMenuProps) {
	const { isOpen } = useSidebar();
	const isHideElements = !!(level === 0 && !isOpen);

	return (
		<Menu
			className={className}
			data={data}
			isHideElements={isHideElements} 
			isRepeatRegisterArrowNavigation={isOpen}
			subMenuDropdownType={isOpen ? DropdownTypeEnum.static : DropdownTypeEnum.absolute}
		/>
	);
})
