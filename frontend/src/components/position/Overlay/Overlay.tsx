import clsx from "clsx";
import style from './Overlay.module.scss';

interface OverlayProps {
  isActive: boolean;
  className?: string;
  isClosable?: boolean;
  onClick?: () => void;
}

export default function Overlay({ className = '', isActive, isClosable = true, onClick }: OverlayProps) {
  return (
    <div
      className={clsx(style.overlay, isActive && style.overlay_active, isClosable && style.overlay_closable, className)}
      onClick={isClosable ? onClick : undefined}
    ></div>
  );
}
