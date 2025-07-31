import { DropdownMenuItemType } from "@/components/menu/DropdownMenu/DropdownMenu";
import { PositionerProps } from "@/components/position/Positioner/Positioner";
import { LucideProps } from "lucide-react";
import ButtonMenu from "./ButtonMenu";
import SimpleButton from "./SimpleButton";

export interface BaseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  Icon?: React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;
  iconClassName?: string;
  children: string;
  actionType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export interface ButtonMenuProps extends BaseButtonProps {
  type: "buttonMenu",
  menuData: DropdownMenuItemType[];
  menuPositionerProps?: PositionerProps;
}

export interface SimpleButtonProps extends BaseButtonProps {
  type: "simpleButton",
}

type ButtonProps = ButtonMenuProps | SimpleButtonProps;

export default function Button(props: ButtonProps) {
  switch(props.type) {
    case "buttonMenu":
      return <ButtonMenu {...props} />
    case "simpleButton":
      return <SimpleButton {...props} />
  }
}