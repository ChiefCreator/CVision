import Popover, { PopoverProps } from "@/components/position/Popover/Popover";
import Menu, { MenuProps } from "../Menu/Menu";

interface DropdownMenuProps extends MenuProps, Omit<PopoverProps, "children"> {
  id: string;
}

export default function DropdownMenu({ id, positioner, close, ...menuProps }: DropdownMenuProps) {
  return (
    <Popover positioner={positioner} id={id} close={close} >
      <Menu {...menuProps} />
    </Popover>    
  );
};
