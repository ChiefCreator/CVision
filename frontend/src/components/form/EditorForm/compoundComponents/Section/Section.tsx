import React from "react";

import type { BaseComponent } from "@/types/root";

import { Control } from "@/components/input/TitleEditor/TitleEditor";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Section as SectionT } from "@/types/document/section/section";
import { SectionTemplate } from "@/types/document/sectionTemplate/sectionTemplate";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import NestedSection from "./NestedSection";
import SingleSection from "./SingleSection";

export type DomainSectionProps<
  T extends DocumentTypeName = DocumentTypeName,
  K extends SectionTemplateKey<T> = SectionTemplateKey<T>
> = {
  section: SectionT<T, K>;
};

export interface BaseSectionProps extends BaseComponent {
  id: string;
  children: React.ReactNode;
  title: string;
  template: SectionTemplate;
  isOpen: boolean;
  deleteControls: Control[];
  onHeadClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onChangeTitle: (val: string) => any;
  onToggleSection: (sectionId: string, subsectionId?: string, open?: boolean) => void;
  onAddSubsection: () => void;
  onChangeIsAllUpdating: (isUpdating: boolean) => void;
}

export interface SingleSectionProps extends BaseSectionProps {
  type: "single";
}
export interface NestedSectionProps extends BaseSectionProps {
  type: "nested";
}

export type SectionProps = SingleSectionProps | NestedSectionProps;

export default function Section(props: SectionProps) {
  switch(props.type) {
    case "single": return <SingleSection {...props} />;
    case "nested": return <NestedSection {...props} />;
  }
}