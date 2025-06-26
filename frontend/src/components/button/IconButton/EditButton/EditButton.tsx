import IconButton from "../IconButton";
import { Pencil } from "lucide-react";

import type { IconButtonProps } from "../IconButton";

export default function EditButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>{<Pencil size={props.size} />}</IconButton>
  );
}