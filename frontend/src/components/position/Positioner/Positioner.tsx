import React, { useImperativeHandle, useLayoutEffect } from "react";

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
  contentRef: React.RefObject<HTMLElement | null>;
  triggerRef?: React.RefObject<HTMLElement | SVGElement | null> | null;
  containerRef?: React.RefObject<HTMLElement | null>;
  anchorOrigin?: Origin;
  transformOrigin?: Origin;
  offsetX?: number;
  offsetY?: number;
  matchTriggerWidth?: boolean;

  position?: {
    left?: number;
    top?: number;
  }

  isFixed?: boolean;
  children?: React.ReactNode;
  positionerHandleRef?: React.RefObject<PositionerHandle | null>;
}

export default function Positioner({
  contentRef,
  triggerRef,
  containerRef,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "left" },
  offsetX = 0,
  offsetY = 0,
  matchTriggerWidth = false,
  position,
  isFixed = false,
  children,
  positionerHandleRef,
}: PositionerProps) {
  const { styles, updateStyles } = useCalculatePosition({
    contentRef, triggerRef, containerRef,
    anchorOrigin, transformOrigin,
    offsetX, offsetY,
    matchTriggerWidth, position, isFixed,
  });

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