import { createStyles } from "@/utils/styles/createStyles";
import { ColumnSectionProps, sectionStyles } from "./Section";

const styles = createStyles({
	content: {
	  marginTop: "15px",
	}
});

export default function ColumnSection({ title, children }: ColumnSectionProps) {
	return (
		<div style={sectionStyles.section}>
			{title && <h2 style={sectionStyles.title}>{title}</h2>}

			<div style={styles.content}>{children}</div>
		</div>
	);
}