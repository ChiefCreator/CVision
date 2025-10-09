import Popover, { PopoverProps } from "@/components/position/Popover/Popover";
import Menu, { MenuProps } from "../Menu/Menu";

export type PopoverMenuProps = MenuProps & Omit<PopoverProps, "children">;

export default function PopoverMenu({ className, id, isOpen, positioner, portal, ...menuProps }: PopoverMenuProps) {
  return (
    <Popover className={className} id={id} isOpen={isOpen} positioner={positioner} portal={portal}>
      <Menu {...menuProps} />
    </Popover>    
  );
};
