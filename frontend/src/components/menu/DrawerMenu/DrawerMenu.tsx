import Drawer from "@/components/position/Drawer/Drawer";
import { useMenuState } from "@/hooks/menu/useMenuState";
import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { findMenuItemById } from "@/utils/menu/findMenuItemById";
import Menu, { MenuProps } from "../Menu/Menu";

export interface DrawerMenuProps extends Pick<MenuProps, "className" | "data" | "level"> {
  isOpen: boolean;
  id?: string;
  title?: string;
  hasCloseButton?: boolean;
  onClose: () => void;
};

export default function DrawerMenu({ isOpen, className, title = "Меню", id, hasCloseButton = true, onClose, data, level = 0 }: DrawerMenuProps) {
  const { openMenuPath, lastOpenPath, openSubMenu, closeSubMenu, setOpenMenuPath, toggleSubMenu } = useMenuState();

  const selectedMenuItem = findMenuItemById(data, lastOpenPath);

  const back = () => {
    setOpenMenuPath([...openMenuPath.slice(0, -1)]);
  }
  
  return (
    <Drawer
      isOpen={isOpen}
      className={className}
      id={id}
      title={selectedMenuItem?.title ?? title}
      hasBackButton={!!selectedMenuItem}
      hasCloseButton={hasCloseButton}
      onClose={onClose}
      onBack={back}
    >
      <Menu
        data={selectedMenuItem?.children ?? data}
        openMenuPath={openMenuPath}
        level={level}
        subMenuDropdownType={DropdownTypeEnum.none}
        isHideElements={false}

        openSubMenu={openSubMenu}
        closeSubMenu={closeSubMenu}
        setOpenMenuPath={setOpenMenuPath}
        toggleSubMenu={toggleSubMenu}
      />
    </Drawer>    
  );
};
