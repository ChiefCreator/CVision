import AnimatePresence, { AnimatePresenceProps } from "../AnimatePresence";

interface AnimateHeightPresenceProps extends Omit<AnimatePresenceProps, "children" | "enter" | "exit"> {
  children: React.ReactNode;
}

export default function AnimateHeightPresence({ children, styles, ...restProps }: AnimateHeightPresenceProps) {
  const enter: gsap.TweenVars = {
    height: "auto",
    duration: .4,
    ease: "power2.inOut",
  };
  const exit: gsap.TweenVars = {
    height: 0,
    duration: .4,
    ease: "power2.inOut",
  };

  return (
    <AnimatePresence {...restProps} enter={enter} exit={exit} styles={{ ...styles, overflow: "hidden" }}>
      {children}
    </AnimatePresence>
  );
}