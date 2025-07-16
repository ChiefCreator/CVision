import React from "react";

import type { BaseComponent } from "@/types/rootTypes";

import { ResumeSectionName } from "@/types/resumeTypes";
import DefaultSection from "./DefaultSection";
import SubsectionSection from "./SubsectionSection";

interface BaseSectionProps extends BaseComponent {
  id?: string;
  sectionName: ResumeSectionName;
  title?: string;
  defaultTitle?: string;
  description?: string;
  children: React.ReactNode;
  additionalContent?: React.ReactNode;

  checkIsOpen: (sectionId: string, subsectionId?: string) => boolean;
  onToggle: (id: string, subsectionId?: string) => void;
  onChange: (value: string) => void;
}

export interface DefaultSectionProps extends BaseSectionProps {
  type?: "default";
}
export interface SubsectionSectionProps extends BaseSectionProps {
  type: "subsection";
  subsectionName: string;
  addSubsectionDto?: any;
}

type SectionProps = DefaultSectionProps | SubsectionSectionProps;

export default function Section(props: SectionProps) {
  if (props.type === "subsection") {
    return <SubsectionSection {...props} />;
  }

  return <DefaultSection {...props} />;
}