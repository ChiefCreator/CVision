import React from "react";

import type { BaseComponent, BaseSectionResume } from "@/types/root";
import type { ResumeSectionName } from "@/types/resumeSection/sectionName";

import SingleSection from "./SingleSection";
import ListSection from "./ListSection";

interface BaseSectionProps extends BaseComponent, Omit<BaseSectionResume, "order"> {
  sectionName: ResumeSectionName;
  children: React.ReactNode;
  additionalContent?: React.ReactNode;

  checkIsOpen: (sectionId: string, subsectionId?: string) => boolean;
  onToggle: (id: string, subsectionId?: string) => void;
  onChange: (value: string) => void;
}

export interface SingleSectionProps extends BaseSectionProps {
  type?: "singleSection";
}
export interface ListSectionProps extends BaseSectionProps {
  type: "list";
  subsectionName: string;
  addSubsectionDto?: any;
}

export type SectionProps = SingleSectionProps | ListSectionProps;

export default function Section(props: SectionProps) {
  if (props.type === "list") {
    return <ListSection {...props} />;
  }

  return <SingleSection {...props} />;
}