import type { ButtonMenuItemData, ControlMenuItemData, LinkMenuItemData } from "../types/menuItemData";
import ButtonMenuItem from "./ButtonMenuItem/ButtonMenuItem";
import LinkMenuItem from "./LinkMenuItem/LinkMenuItem";

interface BaseMenuItemProps {
  level: number;
  index: number;
  isHideElements: boolean;
}

export interface LinkMenuItemProps extends LinkMenuItemData, BaseMenuItemProps {}
export interface ButtonMenuItemProps extends ButtonMenuItemData, BaseMenuItemProps {}
export interface ControlMenuItemProps extends ControlMenuItemData, BaseMenuItemProps {}

type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps | ControlMenuItemProps;

export default function MenuItem(props: MenuItemProps) {
  switch(props.type) {
    case "link":
      return <LinkMenuItem {...props} />;
    case "button":
      return <ButtonMenuItem {...props} />
  }
}