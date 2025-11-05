import { BaseComponent } from "@/types/root";
import Skeleton from "react-loading-skeleton";

import clsx from "clsx";
import styles from "./DocumentControls.module.scss";

export default function DocumentControlsSkeleton({ className }: BaseComponent) {
	return (
		<div className={clsx(styles.buttons, className)}>
			<Skeleton style={{ width: "80px", height: "24px" }} />
		</div>
	);
}