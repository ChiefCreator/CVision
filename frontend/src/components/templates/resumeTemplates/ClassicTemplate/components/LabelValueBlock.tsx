import { createStyles } from "@/utils/styles/createStyles";
import React from "react";

export interface LabelValueBlockProps {
  label?: string;
  value?: string;
  isShowLevel?: boolean;
}

const styles = createStyles({
	block: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "space-between",
	},

	value: {
	  textAlign: "right",
	}
});

export default React.memo(function LabelValueBlock({ label, value, isShowLevel = true }: LabelValueBlockProps) {
  if (!label || !value) return null;

  return (
    <div style={styles.block}>
      <span>{label}</span>
			
      {isShowLevel && <span style={styles.value}>{value}</span>}
    </div>
  );
})