import type { MenuItemData } from "../../../types/menuItemData";
import AbsoluteDropdown from "./AbsoluteDropdown";
import StaticDropdown from "./StaticDropdown";

interface BaseDropdownProps {
  id: string;
  data: MenuItemData[];
  level: number;
  isOpen: boolean;
}

export interface StaticDropdownProps extends BaseDropdownProps {
  type: "static";
}

export interface AbsoluteDropdownProps extends BaseDropdownProps {
  type: "absolute";
  closeSubMenu: () => void;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
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