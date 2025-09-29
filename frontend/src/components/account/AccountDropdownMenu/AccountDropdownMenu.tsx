"use client"

import { PositionerProps } from "@/components/position/Positioner/Positioner";
import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { MenuItemData } from "@/types/menu/menu";
import { LogOut, Settings } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useLogoutMutation } from "@/api/auth/hooks";
import PopoverMenu from "@/components/menu/PopoverMenu/PopoverMenu";
import { useMenuState } from "@/hooks/menu/useMenuState";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import styles from "./AccountDropdownMenu.module.scss";

interface AccountDropdownMenuProps {
	id: string;
	isOpen: boolean;
	positioner: PositionerProps;

	onClose?: () => void;
}

export default function AccountDropdownMenu({ id, isOpen, positioner, onClose }: AccountDropdownMenuProps) {
	const { mutate } = useLogoutMutation();
	const { replace } = useRouter();
	const menuProps = useMenuState();

	const logout = useCallback(() => {
		mutate();

		replace("/auth/login");
	}, [mutate, replace]);

	const data = useMemo<MenuItemData>(() => ([
		{
			id: "account-settings",
			type: "link",
			title: "Настройки аккаунта",
			Icon: Settings,
			pathname: "/settings/account",
		},
		{
			id: "logout",
			type: "control",
			title: "Выйти",
			Icon: LogOut,
			onClick: logout,
		},
	]), [logout]);

	return (
		<PopoverMenu
			className={clsx(styles.dropdown, !positioner.matchTriggerWidth && styles.dropdownArbitraryWidth)}
			isOpen={isOpen}
			positioner={positioner}
			data={data}
			subMenuDropdownType={DropdownTypeEnum.absolute} id={id}
			onClickLinkAndControl={onClose}
			{...menuProps}
		/>
	);
}