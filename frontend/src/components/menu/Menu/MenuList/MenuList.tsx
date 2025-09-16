"use client";

import { useMenu } from "@/hooks/menu/useMenu";
import MenuItem from "../../MenuItem/MenuItem";
import { MenuProps } from "../Menu";
import styles from "./MenuList.module.scss";

interface MenuListProps extends Pick<MenuProps, "data" | "level"> {};

export function MenuList({ data, level }: MenuListProps) {
	const { isHideElements, isRepeatRegisterArrowNavigation, subMenuDropdownType } = useMenu();

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
						{...(data.type === "button" ? { dropdownType: subMenuDropdownType } : {}) as any}
					/>
				</li>
			))}
		</ul>
	);
}
