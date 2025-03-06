import { useRef, useEffect, useState } from "react";

import styles from "./DocumentContainer.module.scss";

export default function DocumentContainer({ children }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (!parent) return;

        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        const scaleX = parentWidth / 940;
        const scaleY = parentHeight / ((940 * 4) / 3);

        const newScale = Math.min(scaleX, scaleY);

        setScale(newScale);

        const newWidth = 940 * newScale;
        const newHeight = (940 * 4 / 3) * newScale;
        setOffset({
          x: -(940 - newWidth) / 2,
          y: -((940 * 4) / 3 - newHeight) / 2
        });
      }
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className={styles.documentContainer}>
      <div
        className={styles.documentContainerScaler}
        style={{
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
