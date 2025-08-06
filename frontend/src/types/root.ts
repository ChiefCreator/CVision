import { LucideProps } from "lucide-react";
import { GeneralSection } from "./resumeSection/generalSection";

export interface BaseEntityFields {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseSectionResume extends Omit<GeneralSection, "id" | "type"> {
  id: string;
  title?: string;
  order: number;
}

export interface BaseSubsectionResume {
  id: string;
}

export interface BaseComponent {
  className?: string;
}

export type IconProps = React.RefAttributes<SVGSVGElement> & LucideProps;
export type IconComponent = React.ComponentType<React.RefAttributes<SVGSVGElement> & LucideProps>;