import { GeneralSection } from "./resumeSection/generalSection";

export interface BaseEntityFields {
  id: string;
  createdAt?: string;
  updatedAt?: string;
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

export type LoadingStatus = "loading" | "success" | "error" | "idle";