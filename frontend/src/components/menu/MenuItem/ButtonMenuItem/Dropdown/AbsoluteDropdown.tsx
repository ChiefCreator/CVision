import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";


import type { AbsoluteDropdownProps } from "./Dropdown";

import Menu from "@/components/menu/Menu/Menu";
import AdaptivePopover from "@/components/position/AdaptivePopover/AdaptivePopover";
import { useMenuContext } from "@/hooks/menu/useMenuContext";
import { useMenuState } from "@/hooks/menu/useMenuState";
import { useEffect } from "react";

export default function AbsoluteDropdown({ id, data, level, isOpen, positionerProps,  closeSubMenu }: AbsoluteDropdownProps) {
  const { isRecalcSubmenu } = useMenuContext();
  const positionerHandleRef = usePositionerHandleRef();
  const menuProps = useMenuState();

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      positionerHandleRef.current?.recalcPosition();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    if (!isRecalcSubmenu) cancelAnimationFrame(frameId);
    return () => cancelAnimationFrame(frameId);
  }, [isRecalcSubmenu]);

  return (
    <AdaptivePopover
      id={id}
      isOpen={isOpen}

      positioner={{
        matchTriggerWidth: false,
        anchorOrigin: { vertical: "top", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        positionerHandleRef: positionerHandleRef,
        ...positionerProps,
      }}

      onClose={closeSubMenu}
    >
      <Menu data={data} level={level} {...menuProps} onClickLinkAndControl={closeSubMenu} />
    </AdaptivePopover>
  );
}