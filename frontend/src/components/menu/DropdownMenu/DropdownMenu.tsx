import Popover, { PopoverProps } from "@/components/position/Popover/Popover";
import Menu, { MenuProps } from "../Menu/Menu";

export interface DropdownMenuProps extends MenuProps, Omit<PopoverProps, "children"> {
  id: string;
}

export default function DropdownMenu({ className, id, positioner, ...menuProps }: DropdownMenuProps) {
  return (
    <Popover className={className} positioner={positioner} id={id}>
      <Menu {...menuProps} />
    </Popover>    
  );
};
