import IconButton from "../IconButton";
import { Pencil } from "lucide-react";

import type { IconButtonProps } from "../IconButton";

export default function EditButton(props: Omit<IconButtonProps, "Icon">) {
  return (
    <IconButton {...props} Icon={Pencil} />
  );
}