import { createStyles } from "@/utils/styles/createStyles";

interface SubsectionListProps {
  children: React.ReactNode;
}

const styles = createStyles({
	list: {
		display: "flex",
  	flexDirection: "column",
  	gap: "30px",
	}
});

export default function SubsectionList({ children }: SubsectionListProps) {
  return (
    <div style={styles.list}>{children}</div>
  );
}