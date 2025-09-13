import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./NotFoundUserAvatar.module.scss";

interface NotFoundUserAvatarProps extends BaseComponent {
  name: string;
}

export function NotFoundUserAvatar({ className, name }: NotFoundUserAvatarProps) {
  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join("");

  return (
  	<div className={clsx(styles.picture, className)}>{initials}</div>
  )
}
