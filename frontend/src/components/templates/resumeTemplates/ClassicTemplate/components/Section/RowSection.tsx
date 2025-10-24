import { createStyles } from "@/utils/styles/createStyles";
import { RowSectionProps, sectionStyles } from "./Section";

const styles = createStyles({
	section: {
	  display: "flex",
	  gap: "30px",
	},

	title: {
	  flex: "1 1 var(--column-1)",
	  maxWidth: "var(--column-1)",
	  wordBreak: "break-word",
	  whiteSpace: "pre-wrap",
	},

	content: {
	  flex: "1 1 var(--column-2)",
	},
});

export default function RowSection({ title, children }: RowSectionProps) {
  return (
    <div style={{ ...sectionStyles.section, ...styles.section }}>
      {title && <h2 style={{ ...sectionStyles.title, ...styles.title }}>{title}</h2>}

      <div style={styles.content}>{children}</div>
    </div>
  );
}