import { useCallback, useState } from "react";

import type { Origin, PositionerProps } from "../Positioner";


interface UseRecalculatePosition extends Omit<PositionerProps, "positionerHandleRef" | "children"> {
  contentRef: React.RefObject<HTMLElement | null>;
}

const getOffset = (origin: Origin, size: { width: number; height: number }): { top: number; left: number } => {
  let top = 0;
  let left = 0;

  switch (origin.vertical) {
    case "top":
      top = 0;
      break;
    case "center":
      top = size.height / 2;
      break;
    case "bottom":
      top = size.height;
      break;
  }

  switch (origin.horizontal) {
    case "left":
      left = 0;
      break;
    case "center":
      left = size.width / 2;
      break;
    case "right":
      left = size.width;
      break;
  }

  return { top, left };
};

export function useCalculatePosition({ contentRef, triggerRef, anchorOrigin = { vertical: "bottom", horizontal: "left" }, transformOrigin = { vertical: "top", horizontal: "left" }, offsetX = 0, offsetY = 0, matchTriggerWidth = false, position }: UseRecalculatePosition) {
  const [styles, setStyles] = useState<React.CSSProperties>({});
  
  const calculateStyles = (): React.CSSProperties => {
    const trigger = triggerRef?.current;
    const content = contentRef?.current;

    console.log(content)

    if (!trigger || !content) return {};
  
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    if (position) {
      return {
        position: "absolute",
        top: position.top,
        left: position.left,
        width: matchTriggerWidth ? triggerRect.width : undefined,
        zIndex: 1000,
      };
    }

    const anchorOffset = getOffset(anchorOrigin, {
      width: triggerRect.width,
      height: triggerRect.height,
    });

    const transformOffset = getOffset(transformOrigin, {
      width: contentRect.width,
      height: contentRect.height,
    });

    const top = triggerRect.top + anchorOffset.top - transformOffset.top + offsetY + window.scrollY;
    const left = triggerRect.left + anchorOffset.left - transformOffset.left + offsetX + window.scrollX;

    return {
      position: "absolute",
      top,
      left,
      width: matchTriggerWidth ? triggerRect.width : undefined,
      zIndex: 1000,
    };
  }
  const updateStyles = useCallback(() => {
    setStyles(calculateStyles());
  }, [setStyles]);

  return { styles, setStyles, calculateStyles, updateStyles };
}