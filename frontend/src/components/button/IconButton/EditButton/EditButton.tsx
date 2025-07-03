import IconButton from "../IconButton";
import { Pencil } from "lucide-react";

import type { IconButtonProps } from "../IconButton";

import baseStyles from "./../IconButton.module.scss";
import clsx from "clsx";

export default function EditButton(props: IconButtonProps) {
  const { className: iconClassName } = props.iconProps || {};

  return (
    <IconButton {...props}>{<Pencil className={clsx(baseStyles.buttonIcon, iconClassName)} />}</IconButton>
  );
}