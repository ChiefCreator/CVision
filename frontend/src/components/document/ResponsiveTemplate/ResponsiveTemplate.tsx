"use client"

import { useRef, useEffect, useState } from "react";

import { DOCUMENT_SIZE } from "@/constants/root/documentSize";

import styles from "./ResponsiveTemplate.module.scss";

interface ResponsiveTemplateProps {
  children: React.ReactNode;
}

export default function ResponsiveTemplate({ children }: ResponsiveTemplateProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  function updateScale() {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;
    const scaleX = parentWidth / DOCUMENT_SIZE.width;
    const scaleY = parentHeight / DOCUMENT_SIZE.height;

    const newScale = Math.min(scaleX, scaleY);

    setScale(newScale);

    const newWidth = DOCUMENT_SIZE.width * newScale;
    const newHeight = DOCUMENT_SIZE.height * newScale;
    setOffset({
      x: -(DOCUMENT_SIZE.width - newWidth) / 2,
      y: -(DOCUMENT_SIZE.height - newHeight) / 2
    });
  };

  useEffect(() => {
    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className={styles.responsiveTemplate}>
      <div
        className={styles.responsiveTemplateScaler}
        style={{
          width: DOCUMENT_SIZE.width,
          height: DOCUMENT_SIZE.height,
          transform: `scale(${scale})`,
          left: offset.x,
          top: offset.y
        }}
      >
        {children}
      </div>
    </div>
  );
};
