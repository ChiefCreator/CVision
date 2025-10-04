"use client";

import { useMenuContext } from "@/hooks/menu/useMenuContext";
import { MenuItem as MenuItemType } from "@/types/menu/menu";
import MenuItem from "../../MenuItem/MenuItem";
import { MenuProps } from "../Menu";
import styles from "./MenuList.module.scss";

interface MenuListProps extends Pick<MenuProps, "data" | "level"> {};

export function MenuList({ data, level }: MenuListProps) {
	const { isHideElements, isRepeatRegisterArrowNavigation, subMenuDropdownType, subMenuDropdownProps, onClickButton, onClickControl, onClickLink, onClickLinkAndControl } = useMenuContext();

	const getOnClick = (data: MenuItemType) => {
		const type = data.type;

		const controlOnClick = () => {
			if (type === "control") data.onClick();
		}
		
		if (onClickLinkAndControl && (type === "link" || type === "control")) {
				onClickLinkAndControl();
				controlOnClick();

				return;
		}

		switch(type) {
			case "link":
				onClickLink?.();
				break;
			case "control": {
				onClickControl?.();
				controlOnClick();

				break;
			}
			case "button":
				onClickButton?.();
				break;
		}
	}

	return (
		<ul className={styles.list}>
			{data.map((data, index) => (
				<li key={data.id}>
					<MenuItem
						{...data}
						level={level}
						index={index}
						isHideElements={isHideElements}
						isRepeatRegisterArrowNavigation={isRepeatRegisterArrowNavigation}

						onClick={() => getOnClick(data)}
						
						{...(data.type === "button" ? { dropdownType: subMenuDropdownType, dropdownPositionerProps: subMenuDropdownProps } : {}) as any}
					/>
				</li>
			))}
		</ul>
	);
}
