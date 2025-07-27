import ColumnListSection from "./ColumnListSection/ColumnListSection";
import HorizontalListSection from "./HorizontalListSection/HorizontalListSection";

import type { BaseComponent } from "@/types/rootTypes";

interface BaseSectionProps extends BaseComponent {
  title?: string;
  children: React.ReactNode;
}

export interface ColumnListSectionProps extends BaseSectionProps {
  type: "columnList";
}

export interface HorizontalListSectionProps extends BaseSectionProps {
  type: "horizontalList";
}

export type SectionProps = ColumnListSectionProps | HorizontalListSectionProps;

export default function Section(props: SectionProps) {
  switch (props.type) {
    case "columnList": return <ColumnListSection {...props} />;
    case "horizontalList": return <HorizontalListSection {...props} />;
  }
}