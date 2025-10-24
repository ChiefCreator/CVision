import { LucideProps } from "lucide-react";
import { CSSProperties } from "react";

export interface BaseEntityFields {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseSubsectionResume {
  id: string;
}

export interface BaseComponent {
  className?: string;
  style?: CSSProperties;
}

export type LoadingStatus = "loading" | "success" | "error" | "idle";

export type IconProps = React.RefAttributes<SVGSVGElement> & LucideProps;
export type IconComponent = React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
