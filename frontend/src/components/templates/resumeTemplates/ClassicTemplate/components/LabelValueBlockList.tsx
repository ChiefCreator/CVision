import React from "react";

import { createStyles } from "@/utils/styles/createStyles";

interface LabelValueBlockListProps {
  children: React.ReactNode;
}

const styles = createStyles({
	list: {
	  display: "grid",
	  gridTemplateColumns: "repeat(2, 1fr)",
	  gap: "10px 20px",
	}
})

export default React.memo(function LabelValueBlockList({ children }: LabelValueBlockListProps) {
  return (
    <div style={styles.list}>
      {children}
    </div>
  );
})