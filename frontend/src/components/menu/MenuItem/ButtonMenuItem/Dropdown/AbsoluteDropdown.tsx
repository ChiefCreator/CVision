import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";
import { useEffect } from "react";
import { useSidebar } from "../../../../../hooks/menu/useSidebar";

import Menu from "../../../Menu/Menu";

import type { AbsoluteDropdownProps } from "./Dropdown";

import Popover from "@/components/position/Popover/Popover";
import { useClickOutside } from "@/hooks/root/useClickOutside";

export default function AbsoluteDropdown({ id, data, level, isOpen, triggerRef, contentRef, closeSubMenu }: AbsoluteDropdownProps) {
  const { isAnimating } = useSidebar();
  const positionerHandleRef = usePositionerHandleRef();
  
  useClickOutside({ mainComponentRef: contentRef, triggerRef, onClickOutside: closeSubMenu });

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      positionerHandleRef.current?.recalcPosition();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    if (!isAnimating) cancelAnimationFrame(frameId);
    return () => cancelAnimationFrame(frameId);
  }, [isAnimating]);

  if (!isOpen) return null;

  return (
    <Popover
      id={id}
      close={close}
      positioner={{
        matchTriggerWidth: false,
        triggerRef: triggerRef,
        contentRef: contentRef,
        anchorOrigin: { vertical: "top", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        positionerHandleRef: positionerHandleRef,
      }}
    >
      <Menu data={data} level={level} />
    </Popover>
  );
}