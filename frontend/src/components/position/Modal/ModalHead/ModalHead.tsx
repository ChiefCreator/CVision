import IconButton from "@/components/button/IconButton/IconButton";
import { ArrowRightIcon, XIcon } from "lucide-react";

import style from './ModalHead.module.scss';

interface ModalHeadProps {
  className?: string;
  title?: string;
  titleClassName?: string;
  hasCloseButton?: boolean;
  hasBackButton?: boolean;

  onBack?: () => void;
  onClose?: () => void;
}

export default function ModalHead({
  className = '',
  title,
  titleClassName,
  hasBackButton = true,
  hasCloseButton = true,
  onBack,
  onClose,
}: ModalHeadProps) {
  return (
    <header className={`${style.head} ${className}`}>
      {hasBackButton && (
        <IconButton
          className={style.backButton}
          Icon={ArrowRightIcon}
          iconClassName={style.backButton__icon}
          onClick={onClose}
        />
      )}

      {title && <span className={`${style.title} ${titleClassName}`}>{title}</span>}

      {hasCloseButton && (
        <IconButton
          className={style.backButton}
          Icon={XIcon}
          iconClassName={style.backButton__icon}
          onClick={onBack}
        />
      )}
    </header>
  );
}
