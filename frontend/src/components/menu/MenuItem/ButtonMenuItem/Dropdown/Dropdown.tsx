import { PositionerProps } from "@/components/position/Positioner/Positioner";
import { DropdownTypeEnum } from "@/types/menu/dropdown";
import type { MenuItemData } from "@/types/menu/menu";
import AbsoluteDropdown from "./AbsoluteDropdown";
import StaticDropdown from "./StaticDropdown";

interface BaseDropdownProps {
  id: string;
  data: MenuItemData;
  level: number;
  isOpen: boolean;
}

export interface StaticDropdownProps extends BaseDropdownProps {
  type: DropdownTypeEnum.static;
}

export interface AbsoluteDropdownProps extends BaseDropdownProps {
  type: DropdownTypeEnum.absolute;
  positionerProps: PositionerProps;
  closeSubMenu: () => void;
}

export interface NoneDropdownProps {
  type: "none";
}

type DropdownProps = StaticDropdownProps | AbsoluteDropdownProps | NoneDropdownProps;

export default function Dropdown(props: DropdownProps) {
  switch(props.type) {
    case "static":
      return <StaticDropdown {...props} />
    case "absolute":
      return <AbsoluteDropdown {...props} />
    case "none":
      return null;
  }
}