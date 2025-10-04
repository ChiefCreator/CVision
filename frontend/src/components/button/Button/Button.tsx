import { PositionerProps } from "@/components/position/Positioner/Positioner";
import { MenuItemData } from "@/types/menu/menu";
import { LoadingStatus } from "@/types/root";
import { LucideProps } from "lucide-react";
import ButtonMenu from "./ButtonMenu";
import SimpleButton from "./SimpleButton";
import { SubmitButton } from "./SubmitButton";

export interface BaseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: "primary" | "secondary" | "neutral" | "danger";
  Icon?: React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;
  iconClassName?: string;
  children: string;
  actionType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export interface ButtonMenuProps extends BaseButtonProps {
  type: "buttonMenu";
  menuData: MenuItemData;
  menuPositionerProps?: Partial<PositionerProps>;
  menuTitle?: string;
}

export interface SimpleButtonProps extends BaseButtonProps {
  type: "simpleButton";
}

export interface SubmitButtonProps extends BaseButtonProps {
  type: "submit";
  status: LoadingStatus;
  titleVariants?: {
    loading: string;
    success: string;
    error: string;
  }

  setStatus: (status: LoadingStatus) => void;
}

type ButtonProps = ButtonMenuProps | SimpleButtonProps | SubmitButtonProps;

export default function Button(props: ButtonProps) {
  switch(props.type) {
    case "buttonMenu":
      return <ButtonMenu {...props} />
    case "simpleButton":
      return <SimpleButton {...props} />
    case "submit":
      return <SubmitButton {...props} />
  }
}