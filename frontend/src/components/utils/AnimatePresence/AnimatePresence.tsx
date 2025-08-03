import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import type { BaseComponent } from '@/types/root';

export interface AnimatePresenceProps extends BaseComponent {
  children: React.ReactNode;
  isVisible: boolean;
  enter?: gsap.TweenVars;
  exit?: gsap.TweenVars;
  styles?: React.CSSProperties;
  onHidden?: () => void;
}

export default function AnimatePresence({ children, isVisible, enter, exit, styles, className, onHidden }: AnimatePresenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(isVisible);
  const hasMounted = useRef(false);

  const defaultEnter: gsap.TweenVars = {
    opacity: 1,
    duration: .4,
    ease: "none",
  };
  const defaultExit: gsap.TweenVars = {
    opacity: 0,
    duration: .4,
    ease: "none",
  };

  useLayoutEffect(() => {
    setTimeout(() => hasMounted.current = true);
  }, []);
  useLayoutEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  // Анимация входа
  useLayoutEffect(() => {
    if (shouldRender && isVisible && ref.current && hasMounted.current) {
      gsap.fromTo(ref.current, exit || defaultExit, enter || defaultEnter);
    }
  }, [shouldRender, isVisible]);

  // Анимация выхода
  useLayoutEffect(() => {
    if (!isVisible && ref.current && hasMounted.current) {
      gsap.to(ref.current, {
        ...(exit || defaultExit),
        onComplete: () => {
          setShouldRender(false);
          onHidden?.();
        },
      });
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div ref={ref} style={styles} className={className}>{children}</div>
  );
};
