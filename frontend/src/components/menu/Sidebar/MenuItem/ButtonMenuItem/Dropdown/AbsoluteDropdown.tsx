import { useEffect, useRef } from "react";
import { useSidebar } from "../../../hooks/useSidebar";
import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";

import Portal from "@/components/position/Portal/Portal";
import Positioner from "@/components/position/Positioner/Positioner";
import Menu from "../../../Menu/Menu";

import type { AbsoluteDropdownProps } from "./Dropdown";

import styles from "./Dropdown.module.scss";
import { useClickOutside } from "@/hooks/root/useClickOutside";

export default function AbsoluteDropdown({ id, data, level, isOpen, triggerRef, closeSubMenu }: AbsoluteDropdownProps) {
  const { isAnimating } = useSidebar();
  const positionerHandleRef = usePositionerHandleRef();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({ mainComponentRef: dropdownRef, triggerRef, onClickOutside: closeSubMenu });

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
    <Portal>
      <Positioner
        matchTriggerWidth={false}
        triggerRef={triggerRef}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        positionerHandleRef={positionerHandleRef}
      >
        <div className={styles.dropdownAbsolute} ref={dropdownRef} id={id}>
          <Menu data={data} level={level} />
        </div>
      </Positioner>
    </Portal>
  );
}