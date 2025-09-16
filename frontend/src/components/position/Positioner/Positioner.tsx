import React, { useImperativeHandle, useLayoutEffect, useRef } from "react";

import stylesPositioner from "./Positioner.module.scss";
import { useCalculatePosition } from "./hooks/useRecalculatePosition";

export type Origin = {
  vertical: "top" | "center" | "bottom";
  horizontal: "left" | "center" | "right";
};

export interface PositionerHandle {
  recalcPosition: () => void;
}

export interface PositionerProps {
  positionerHandleRef?: React.RefObject<PositionerHandle | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  triggerRef?: React.RefObject<HTMLElement | SVGElement | null> | null;
  anchorOrigin?: Origin;
  transformOrigin?: Origin;
  offsetX?: number;
  offsetY?: number;
  matchTriggerWidth?: boolean;
  position?: {
    left?: number;
    top?: number;
  }
  children?: React.ReactNode;
}

export default function Positioner({ positionerHandleRef, contentRef, triggerRef, anchorOrigin = { vertical: "bottom", horizontal: "left" }, transformOrigin = { vertical: "top", horizontal: "left" }, offsetX = 0, offsetY = 0, matchTriggerWidth = false, position, children }: PositionerProps) {
  const { styles, updateStyles } = useCalculatePosition({ contentRef, triggerRef, anchorOrigin, transformOrigin, offsetX, offsetY, matchTriggerWidth, position });

  useLayoutEffect(() => {
    updateStyles();

    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("resize", updateStyles);
    };
  }, [updateStyles]);
  useImperativeHandle(positionerHandleRef, () => ({
    recalcPosition: updateStyles,
  }))

  return (
    <div className={stylesPositioner.positioner} style={styles}>
      {children}
    </div>
  );
};