import { DropdownTypeEnum } from "@/types/menu/dropdown";
import type {
  ButtonMenuItem as ButtonMenuItemType,
  ControlMenuItem as ControlMenuItemType,
  LinkMenuItem as LinkMenuItemType
} from "@/types/menu/menu";
import ButtonMenuItem from "./ButtonMenuItem/ButtonMenuItem";
import ControlMenuItem from "./ControlMenuItem/ControlMenuItem";
import LinkMenuItem from "./LinkMenuItem/LinkMenuItem";

interface BaseMenuItemProps {
  level: number;
  index: number;
  isHideElements?: boolean;
  isRepeatRegisterArrowNavigation?: boolean
}

export interface LinkMenuItemProps extends LinkMenuItemType, BaseMenuItemProps {}
export interface ButtonMenuItemProps extends ButtonMenuItemType, BaseMenuItemProps {
  dropdownType: DropdownTypeEnum;
}
export interface ControlMenuItemProps extends ControlMenuItemType, BaseMenuItemProps {}

type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps | ControlMenuItemProps;

export default function MenuItem(props: MenuItemProps) {
  switch(props.type) {
    case "link":
      return <LinkMenuItem {...props} />;
    case "button":
      return <ButtonMenuItem {...props} />
    case "control":
      return <ControlMenuItem {...props} />
  }
}