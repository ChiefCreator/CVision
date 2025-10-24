import { createStyles } from "@/utils/styles/createStyles";

import type { BaseComponent } from "@/types/root";
import ColumnSection from "./ColumnSection";
import RowSection from "./RowSection";

interface BaseSectionProps extends BaseComponent {
  title?: string;
  children: React.ReactNode;
}

export interface ColumnSectionProps extends BaseSectionProps {
  type: "column";
}

export interface RowSectionProps extends BaseSectionProps {
  type: "row";
}

export type SectionProps = ColumnSectionProps | RowSectionProps;

export const sectionStyles = createStyles({
	section: {
		borderTop: "2px solid var(--color-primary)",
		padding: "10px",
	},
	title: {
		fontSize: "var(--font-size-section-title)",
		fontWeight: "var(--font-subtitle)",
		textTransform: "uppercase",
		letterSpacing: "1px",
	},
});

export default function Section(props: SectionProps) {
  switch (props.type) {
    case "column": return <ColumnSection {...props} />;
    case "row": return <RowSection {...props} />;
  }
}